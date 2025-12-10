"""Calendar service for generating ICS files."""
from datetime import datetime, timedelta
from typing import Optional
from app.models import Session


class CalendarService:
    """Service class for calendar-related operations."""

    @staticmethod
    def generate_ics(session: Session) -> str:
        """
        Generate ICS (iCalendar) file content for a session.

        Args:
            session: Session object

        Returns:
            ICS file content as string
        """
        # Combine date and time to create datetime
        start_datetime = datetime.combine(session.date, session.time)
        end_datetime = start_datetime + timedelta(minutes=session.duration_minutes)

        # Format datetime for ICS (YYYYMMDDTHHmmss)
        dtstart = start_datetime.strftime('%Y%m%dT%H%M%S')
        dtend = end_datetime.strftime('%Y%m%dT%H%M%S')
        dtstamp = datetime.utcnow().strftime('%Y%m%dT%H%M%SZ')

        # Create description
        description = f"{session.summary}\\n\\n"
        description += f"Abstract: {session.abstract}\\n\\n"

        if session.objectives:
            description += "Objectives:\\n"
            for obj in session.objectives:
                description += f"- {obj}\\n"
            description += "\\n"

        description += f"Speaker: {session.speaker.name}\\n"
        description += f"Designation: {session.speaker.designation}\\n\\n"

        if session.meeting_link:
            description += f"Meeting Link: {session.meeting_link}\\n"
        if session.meeting_id:
            description += f"Meeting ID: {session.meeting_id}\\n"
        if session.meeting_password:
            description += f"Password: {session.meeting_password}\\n"

        # Create location
        location = session.platform
        if session.meeting_link:
            location += f" - {session.meeting_link}"

        # Build ICS content
        ics_content = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//AIIMS Telepathology//Teaching Session//EN",
            "CALSCALE:GREGORIAN",
            "METHOD:PUBLISH",
            "BEGIN:VEVENT",
            f"UID:{session.id}@aiims-telepathology.edu",
            f"DTSTAMP:{dtstamp}",
            f"DTSTART:{dtstart}",
            f"DTEND:{dtend}",
            f"SUMMARY:{session.title}",
            f"DESCRIPTION:{description}",
            f"LOCATION:{location}",
            "STATUS:CONFIRMED",
            "SEQUENCE:0",
            "BEGIN:VALARM",
            "TRIGGER:-PT15M",
            "ACTION:DISPLAY",
            "DESCRIPTION:Reminder: Session starts in 15 minutes",
            "END:VALARM",
            "END:VEVENT",
            "END:VCALENDAR"
        ]

        return "\r\n".join(ics_content)
