import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction"; 
import timeGridPlugin from "@fullcalendar/timegrid";
import { EventClickArg } from "@fullcalendar/core";
import Swal from "sweetalert2";


interface CalendarEvent {
  title: string;
  date: string;
  color: string;
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    if (events.length) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  const handleDateClick = (info: DateClickArg) => {
    Swal.fire({
      title: `What do you want to add on ${info.dateStr}?`,
      input: "select",
      inputOptions: {
        event: "Event",
        reminder: "Reminder",
      },
      inputPlaceholder: "Select Event or Reminder",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to select either Event or Reminder!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value === "event") {
          Swal.fire({
            title: "Enter Event Title:",
            input: "text",
            inputPlaceholder: "Event Title",
            showCancelButton: true,
          }).then((inputResult) => {
            if (inputResult.isConfirmed && inputResult.value) {
              const eventTitle = inputResult.value;
              setEvents((prevEvents) => [
                ...prevEvents,
                { title: eventTitle, date: info.dateStr, color: "blue" },
              ]);
            }
          });
        } else if (result.value === "reminder") {
          Swal.fire({
            title: "Enter Reminder Title:",
            input: "text",
            inputPlaceholder: "Reminder Title",
            showCancelButton: true,
          }).then((inputResult) => {
            if (inputResult.isConfirmed && inputResult.value) {
              const reminderTitle = inputResult.value;
              setEvents((prevEvents) => [
                ...prevEvents,
                { title: reminderTitle, date: info.dateStr, color: "green" },
              ]);
            }
          });
        }
      }
    });
  };

  const handleEventClick = (info: EventClickArg) => {
    Swal.fire({
      title: `What do you want to do with "${info.event.title}"?`,
      showCancelButton: true,
      confirmButtonText: "Edit",
      cancelButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Enter New Title:",
          input: "text",
          inputPlaceholder: "New Title",
          showCancelButton: true,
          preConfirm: (newTitle) => newTitle,
        }).then((inputResult) => {
          if (inputResult.isConfirmed && inputResult.value) {
            const newTitle = inputResult.value;
            setEvents((prevEvents) =>
              prevEvents.map((event) =>
                event.title === info.event.title && event.date === info.event.startStr
                  ? { ...event, title: newTitle }
                  : event
              )
            );
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        setEvents((prevEvents) =>
          prevEvents.filter(
            (event) =>
              !(event.title === info.event.title && event.date === info.event.startStr)
          )
        );
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Event Calendar</h2>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          editable={true}
          eventColor="teal"
          height="500px"  // Set the height of the calendar to 500px (you can adjust it)
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          buttonText={{
            today: "Today",
            month: "Month",
            week: "Week",
            day: "Day",
          }}
        />
      </div>
    </div>
  );
};

export default Calendar;
