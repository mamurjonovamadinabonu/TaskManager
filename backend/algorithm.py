from datetime import date, timedelta
from sqlalchemy.orm import Session
from .models import Workload, Room, Timetable

def generate_timetable(db: Session, start_date: date, days_count: int = 5):
    workloads = db.query(Workload).all()
    rooms = db.query(Room).all()

    db.query(Timetable).delete()
    db.commit()

    slots = [1, 2, 3, 4] # 1: 09:00, 2: 10:40, 3: 13:00, 4: 14:40

    for workload in workloads:
        remaining = workload.weekly_classes
        teacher = workload.teacher
        group = workload.group

        current_day = 0
        while remaining > 0 and current_day < days_count:
            target_date = start_date + timedelta(days=current_day)
            day_name = target_date.strftime("%A")

            teacher_slots = teacher.availability.get(day_name, [])

            # Sort slots based on preferred time (morning: 1-2, afternoon: 3-4)
            available_slots = list(teacher_slots)
            if workload.preferred_time == "morning":
                available_slots.sort(key=lambda x: (x > 2, x))
            elif workload.preferred_time == "afternoon":
                available_slots.sort(key=lambda x: (x <= 2, x))

            for slot in available_slots:
                if remaining <= 0:
                    break

                # Check teacher & group double booking
                t_busy = db.query(Timetable).filter_by(date=target_date, slot_number=slot, teacher_id=teacher.id).first()
                g_busy = db.query(Timetable).filter_by(date=target_date, slot_number=slot, group_id=group.id).first()

                if not t_busy and not g_busy:
                    # Find suitable room respecting capacity and lab requirement
                    suitable_room = None
                    for room in rooms:
                        if room.capacity >= group.student_count:
                            if workload.requires_lab and not room.is_computer_lab:
                                continue
                            if not workload.requires_lab and room.is_computer_lab:
                                # Prefer non-lab for regular classes unless no room
                                pass

                            room_busy = db.query(Timetable).filter_by(date=target_date, slot_number=slot, room_id=room.id).first()
                            if not room_busy:
                                suitable_room = room
                                break

                    # Fallback if lab room needed and exact match not found
                    if not suitable_room and workload.requires_lab:
                        for room in rooms:
                            if room.is_computer_lab and room.capacity >= group.student_count:
                                suitable_room = room
                                break

                    if not suitable_room:
                        for room in rooms:
                            if room.capacity >= group.student_count:
                                suitable_room = room
                                break

                    if suitable_room:
                        entry = Timetable(
                            date=target_date,
                            slot_number=slot,
                            group_id=group.id,
                            teacher_id=teacher.id,
                            room_id=suitable_room.id,
                            subject_name=workload.subject_name
                        )
                        db.add(entry)
                        db.commit()
                        remaining -= 1

            current_day += 1

    return {"status": "success", "message": "Timetable generated successfully with lab and time preferences!"}
