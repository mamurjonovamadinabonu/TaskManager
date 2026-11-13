from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import date
from typing import List, Optional

from .database import engine, get_db
from .models import Base, Group, Room, Teacher, Timetable, Workload
from .algorithm import generate_timetable

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Riga Nordic University Timetable Portal", version="3.0")

class TimetableUpdate(BaseModel):
    date: date
    slot_number: int
    group_id: int
    teacher_id: int
    room_id: int
    subject_name: str

@app.post("/api/timetable/update/{entry_id}")
def update_timetable_entry(entry_id: int, entry: TimetableUpdate, force: bool = False, db: Session = Depends(get_db)):
    group = db.query(Group).filter_by(id=entry.group_id).first()
    room = db.query(Room).filter_by(id=entry.room_id).first()

    warnings = []

    # 1. Capacity check
    if group and room and group.student_count > room.capacity:
        raise HTTPException(status_code=400, detail={
            "error": f"Room capacity exceeded! Group students: {group.student_count}, Room capacity: {room.capacity}"
        })

    # 2. Room booking check (Smart Recommendation workflow)
    existing_room = db.query(Timetable).filter_by(date=entry.date, slot_number=entry.slot_number, room_id=entry.room_id).filter(Timetable.id != entry_id).first()
    if existing_room and not force:
        # Find free alternative rooms
        free_rooms = db.query(Room).filter(Room.capacity >= group.student_count).all()
        recommended = []
        for r in free_rooms:
            busy = db.query(Timetable).filter_by(date=entry.date, slot_number=entry.slot_number, room_id=r.id).first()
            if not busy:
                recommended.append({"id": r.id, "number": r.number, "capacity": r.capacity})

        raise HTTPException(status_code=409, detail={
            "warning": f"Room {room.number} is already booked at this time by another group! Do you want to allow multi-group sharing in this room?",
            "recommended_rooms": recommended
        })

    db_entry = db.query(Timetable).filter_by(id=entry_id).first()
    if not db_entry:
        raise HTTPException(status_code=404, detail="Entry not found")

    for key, value in entry.dict().items():
        setattr(db_entry, key, value)

    db.commit()
    db.refresh(db_entry)
    return {"status": "success", "message": "Timetable updated successfully", "data": db_entry}

@app.post("/api/timetable/generate")
def trigger_generation(start_date: date, db: Session = Depends(get_db)):
    return generate_timetable(db, start_date=start_date)
