from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, JSON, Date
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    student_count = Column(Integer, nullable=False)
    faculty = Column(String, nullable=False) # Business, Tourism, IT
    course = Column(Integer, nullable=False) # 1-4 years

    workloads = relationship("Workload", back_populates="group")
    timetable_entries = relationship("Timetable", back_populates="group")

class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)
    number = Column(String, unique=True, index=True, nullable=False)
    capacity = Column(Integer, nullable=False)
    is_computer_lab = Column(Boolean, default=False, nullable=False) # Lab requirement support

    timetable_entries = relationship("Timetable", back_populates="room")

class Teacher(Base):
    __tablename__ = "teachers"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, index=True, nullable=False)
    availability = Column(JSON, nullable=False) # {"Monday": [1, 2], "Tuesday": [3, 4]}
    max_weekly_hours = Column(Integer, default=12, nullable=False)

    workloads = relationship("Workload", back_populates="teacher")
    timetable_entries = relationship("Timetable", back_populates="teacher")

class Workload(Base):
    __tablename__ = "workloads"

    id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer, ForeignKey("groups.id"), nullable=False)
    subject_name = Column(String, nullable=False)
    teacher_id = Column(Integer, ForeignKey("teachers.id"), nullable=False)
    weekly_classes = Column(Integer, nullable=False) # Weekly hours / classes
    requires_lab = Column(Boolean, default=False, nullable=False)
    preferred_time = Column(String, default="any", nullable=False) # "morning", "afternoon", "any"

    group = relationship("Group", back_populates="workloads")
    teacher = relationship("Teacher", back_populates="workloads")

class Timetable(Base):
    __tablename__ = "timetable"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    slot_number = Column(Integer, nullable=False) # 1, 2, 3, 4
    group_id = Column(Integer, ForeignKey("groups.id"), nullable=False)
    teacher_id = Column(Integer, ForeignKey("teachers.id"), nullable=False)
    room_id = Column(Integer, ForeignKey("rooms.id"), nullable=False)
    subject_name = Column(String, nullable=False)

    group = relationship("Group", back_populates="timetable_entries")
    teacher = relationship("Teacher", back_populates="timetable_entries")
    room = relationship("Room", back_populates="timetable_entries")
