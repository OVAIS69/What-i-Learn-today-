import React, { useState } from "react";

export default function CalendarPage({ onNavigate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 8)); // September 2025
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [filter, setFilter] = useState("all");

  const today = new Date();

  const timeSlots = [
    { id: 1, label: "10:00 AM - 12:00 PM", type: "morning" },
    { id: 2, label: "01:00 PM - 03:00 PM", type: "afternoon" },
    { id: 3, label: "04:00 PM - 06:00 PM", type: "evening" },
  ];

  // Simulated bookings to prevent double booking
  const bookedSlots = {
    "2025-09-12": [1], // Example: 10:00 AM - 12:00 PM booked on 12 Sept 2025
    "2025-09-15": [2, 3], // Example: Afternoon & Evening booked on 15 Sept 2025
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (clickedDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;

    if (selectedDates.length === 0) {
      setSelectedDates([clickedDate]);
    } else if (selectedDates.length === 1) {
      const [first] = selectedDates;
      if (clickedDate < first) {
        setSelectedDates([clickedDate, first]);
      } else {
        setSelectedDates([first, clickedDate]);
      }
    } else {
      setSelectedDates([clickedDate]);
    }
    setSelectedSlot(null);
  };

  const isInRange = (day) => {
    if (selectedDates.length === 2) {
      const [start, end] = selectedDates;
      const check = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      return check >= start && check <= end;
    }
    return false;
  };

  const isAvailable = (day, slotId) => {
    const dateKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (bookedSlots[dateKey]?.includes(slotId)) return false; // prevent double booking

    if (day % 2 !== 0) {
      return slotId !== 3;
    } else {
      return slotId !== 1;
    }
  };

  const getSlotStatus = (day, slotId) => {
    const dateKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (bookedSlots[dateKey]?.includes(slotId)) return "full"; // already booked

    if (!isAvailable(day, slotId)) return "full";
    if (slotId === 2) return "limited";
    return "available";
  };

  const navigateTo = (path) => {
    if (typeof onNavigate === "function") {
      onNavigate(path);
    } else if (typeof window !== "undefined") {
      window.location.href = path;
    } else {
      console.warn("No navigate available — attempted to navigate to:", path);
    }
  };

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startOffset = (firstDayOfMonth + 6) % 7;

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1));
    setSelectedDates([]);
    setSelectedSlot(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1));
    setSelectedDates([]);
    setSelectedSlot(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex justify-center items-start py-8 px-4 md:py-16 md:px-6">
      <div className="bg-gray-800 w-full max-w-6xl rounded-lg border border-gray-700 shadow-xl p-6 md:p-8 flex flex-col md:flex-row gap-8">
        {/* Calendar Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              {currentMonth.toLocaleString("default", { month: "long" })} {year}
            </h2>
            <div className="flex space-x-3">
              <button
                onClick={handlePrevMonth}
                className="px-4 py-2 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600 font-medium transition-colors"
              >
                ← Previous
              </button>
              <button
                onClick={handleNextMonth}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 border border-blue-600 font-medium transition-colors"
              >
                Next →
              </button>
            </div>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 gap-1 text-center text-gray-400 font-semibold mb-4 text-sm md:text-base border-b border-gray-700 pb-2">
            <div>Monday</div>
            <div>Tuesday</div>
            <div>Wednesday</div>
            <div>Thursday</div>
            <div>Friday</div>
            <div>Saturday</div>
            <div>Sunday</div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 md:gap-2 text-center text-sm md:text-base">
            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="p-3 md:p-4"></div>
            ))}

            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const thisDate = new Date(year, month, day);
              const isPast = thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
              const isToday =
                thisDate.getDate() === today.getDate() &&
                thisDate.getMonth() === today.getMonth() &&
                thisDate.getFullYear() === today.getFullYear();
              const isWeekend = thisDate.getDay() === 0 || thisDate.getDay() === 6;
              const isSelected = selectedDates.some(
                (d) => d.getDate() === day && d.getMonth() === month && d.getFullYear() === year
              );

              return (
                <div
                  key={day}
                  onClick={() => handleDateClick(day)}
                  className={`cursor-pointer rounded-md p-3 md:p-4 border-2 transition-all duration-200 font-medium
                    ${isPast ? "bg-gray-900 text-gray-600 cursor-not-allowed border-gray-700" : ""}
                    ${isToday ? "ring-2 ring-blue-500 border-blue-500 bg-blue-900/30" : ""}
                    ${isWeekend && !isPast ? "bg-gray-700 border-gray-600" : ""}
                    ${isSelected || isInRange(day) ? "bg-blue-600 text-white border-blue-500 shadow-lg" : "bg-gray-700 hover:bg-gray-600 border-gray-600 hover:border-gray-500 text-gray-300"}`}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Side Panel */}
        <div className="w-full md:w-1/3 bg-gray-700 border border-gray-600 rounded-lg p-6 shadow-lg">
          {selectedDates.length > 0 ? (
            <>
              <h3 className="text-xl font-bold mb-4 text-white">
                {selectedDates.length === 1
                  ? selectedDates[0].toLocaleDateString("default", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : `${selectedDates[0].toLocaleDateString("default", {
                      month: "short",
                      day: "numeric",
                    })} - ${selectedDates[1].toLocaleDateString("default", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}`}
              </h3>

              {/* Filters */}
              {selectedDates.length === 1 && (
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-2 text-gray-300">Filter Slots:</label>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full border border-gray-600 rounded-md px-3 py-2 bg-gray-800 text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Time Slots</option>
                    <option value="morning">Morning (10:00 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (01:00 PM - 03:00 PM)</option>
                    <option value="evening">Evening (04:00 PM - 06:00 PM)</option>
                  </select>
                </div>
              )}

              {selectedDates.length === 1 && (
                <div className="space-y-3">
                  {timeSlots
                    .filter((slot) => filter === "all" || slot.type === filter)
                    .map((slot) => {
                      const status = getSlotStatus(selectedDates[0].getDate(), slot.id);
                      const isFull = status === "full";
                      const isLimited = status === "limited";
                      const isAvailableSlot = status === "available";

                      return (
                        <div
                          key={slot.id}
                          title={
                            isFull
                              ? "This slot is fully booked"
                              : isLimited
                              ? "Few slots left"
                              : "Available"
                          }
                          onClick={() => !isFull && setSelectedSlot(slot.id)}
                          className={`p-4 rounded-md border-2 cursor-pointer transition-all duration-200 text-sm flex justify-between items-center font-medium
                            ${selectedSlot === slot.id
                              ? "bg-blue-600 text-white border-blue-500 shadow-lg"
                              : isFull
                              ? "bg-red-900/50 border-red-700 text-red-400 cursor-not-allowed"
                              : isLimited
                              ? "bg-yellow-900/50 border-yellow-700 text-yellow-400 hover:bg-yellow-800/50"
                              : "bg-green-900/50 hover:bg-green-800/50 border-green-700 text-green-400"}`}
                        >
                          <span>{slot.label}</span>
                          {isFull ? "❌" : isLimited ? "⚠️" : "✅"}
                        </div>
                      );
                    })}
                </div>
              )}

              {/* Color Legend */}
              {selectedDates.length === 1 && (
                <div className="mt-6 text-sm text-gray-400 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="inline-block w-4 h-4 bg-green-700 rounded border border-green-600"></span>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-block w-4 h-4 bg-yellow-700 rounded border border-yellow-600"></span>
                    <span>Limited Availability</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-block w-4 h-4 bg-red-700 rounded border border-red-600"></span>
                    <span>Fully Booked</span>
                  </div>
                </div>
              )}

              {(selectedSlot || selectedDates.length === 2) && (
                <button
                  onClick={() => navigateTo("/booking")}
                  className="mt-6 w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-semibold transition-colors shadow-lg"
                >
                  Proceed to Booking
                </button>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500 text-6xl mb-4">📅</div>
              <p className="text-gray-400 font-medium">Select a date to view availability</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
