import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Building, Search, Menu, X, Moon, Sun, CheckCircle, AlertCircle, User, Mail, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

// Mock data based on the blueprints
const roomsData = {
  'X-Block': [
    { id: 'X-001', name: 'X-001', type: 'Classroom', capacity: 40, block: 'X' },
    { id: 'X-002', name: 'X-002', type: 'Classroom', capacity: 34, block: 'X' },
    { id: 'X-003', name: 'X-003', type: 'Classroom', capacity: 34, block: 'X' },
    { id: 'X-004', name: 'X-004', type: 'Classroom', capacity: 35, block: 'X' },
    { id: 'X-005', name: 'X-005', type: 'Classroom', capacity: 37, block: 'X' },
    { id: 'X-006', name: 'X-006', type: 'Classroom', capacity: 36, block: 'X' },
    { id: 'X-007', name: 'X-007', type: 'Classroom', capacity: 31, block: 'X' },
    { id: 'X-008', name: 'X-008', type: 'Classroom', capacity: 33, block: 'X' },
    { id: 'X-011', name: 'X-011', type: 'Staff Room', capacity: 45, block: 'X' },
    { id: 'X-012', name: 'X-012', type: 'Classroom', capacity: 45, block: 'X' },
    { id: 'X-013', name: 'X-013', type: 'Classroom', capacity: 34, block: 'X' },
    { id: 'X-014', name: 'X-014', type: 'Classroom', capacity: 33, block: 'X' },
    { id: 'X-015', name: 'X-015', type: 'Classroom', capacity: 34, block: 'X' },
    { id: 'X-016', name: 'X-016', type: 'Office', capacity: 10, block: 'X' },
    { id: 'X-017', name: 'X-017', type: 'Laboratory', capacity: 40, block: 'X' },
    { id: 'X-018', name: 'X-018', type: 'Classroom', capacity: 40, block: 'X' },
    { id: 'X-019', name: 'X-019', type: 'Computer Lab', capacity: 40, block: 'X' },
    { id: 'X-020', name: 'X-020', type: 'Classroom', capacity: 40, block: 'X' },
    { id: 'X-104', name: 'X-104', type: 'Laboratory', capacity: 103, block: 'X' },
    { id: 'X-105', name: 'X-105', type: 'Laboratory', capacity: 16, block: 'X' },
    { id: 'X-106', name: 'X-106', type: 'Laboratory', capacity: 42, block: 'X' },
    { id: 'X-109', name: 'X-109', type: 'Exam Cell', capacity: 20, block: 'X' },
    { id: 'X-113', name: 'X-113', type: 'Seminar Hall', capacity: 60, block: 'X' },
    { id: 'X-114', name: 'X-114', type: 'Laboratory', capacity: 39, block: 'X' },
    { id: 'X-115', name: 'X-115', type: 'Laboratory', capacity: 16, block: 'X' },
    { id: 'X-116', name: 'X-116', type: 'Staff Room', capacity: 20, block: 'X' },
    { id: 'X-117', name: 'X-117', type: 'Mobile Lab', capacity: 15, block: 'X' },
    { id: 'X-118', name: 'X-118', type: 'Mobile Lab', capacity: 15, block: 'X' },
    { id: 'X-119', name: 'X-119', type: 'Laboratory', capacity: 20, block: 'X' },
    { id: 'X-120', name: 'X-120', type: 'Laboratory', capacity: 20, block: 'X' },
    { id: 'X-121', name: 'X-121', type: 'Laboratory', capacity: 20, block: 'X' },
    { id: 'X-122', name: 'X-122', type: 'Laboratory', capacity: 20, block: 'X' },
    { id: 'X-123', name: 'X-123', type: 'Laboratory', capacity: 50, block: 'X' },
    { id: 'X-101', name: 'X-101', type: 'Placement Cell', capacity: 25, block: 'X' },
    { id: 'X-102', name: 'X-102', type: 'IQAC', capacity: 15, block: 'X' },
    { id: 'X-103', name: 'X-103', type: 'Laboratory', capacity: 42, block: 'X' }
  ],
  'Y-Block': [
    { id: 'Y-001', name: 'Y-001', type: 'Seminar Hall', capacity: 60, block: 'Y' },
    { id: 'Y-002', name: 'Y-002', type: 'Classroom', capacity: 42, block: 'Y' },
    { id: 'Y-003', name: 'Y-003', type: 'Reading Room', capacity: 30, block: 'Y' },
    { id: 'Y-102', name: 'Y-102', type: 'Classroom', capacity: 40, block: 'Y' },
    { id: 'Y-103', name: 'Y-103', type: 'Classroom', capacity: 40, block: 'Y' },
    { id: 'Y-104', name: 'Y-104', type: 'Staff Room', capacity: 25, block: 'Y' },
    { id: 'Y-105', name: 'Y-105', type: 'Classroom', capacity: 40, block: 'Y' },
    { id: 'Y-106', name: 'Y-106', type: 'Classroom', capacity: 42, block: 'Y' }
  ]
};

const allRooms = [...roomsData['X-Block'], ...roomsData['Y-Block']];

// Mock bookings data
const mockBookings = [
  { id: 1, roomId: 'X-001', bookedBy: 'Dr. Smith', event: 'Mathematics Lecture', date: '2024-09-01', time: '09:00-11:00', status: 'confirmed' },
  { id: 2, roomId: 'Y-001', bookedBy: 'Prof. Johnson', event: 'Physics Seminar', date: '2024-09-01', time: '14:00-16:00', status: 'confirmed' },
  { id: 3, roomId: 'X-104', bookedBy: 'Dr. Brown', event: 'Chemistry Lab', date: '2024-09-02', time: '10:00-12:00', status: 'pending' },
  { id: 4, roomId: 'Y-002', bookedBy: 'Prof. Davis', event: 'Computer Science Lab', date: '2024-09-02', time: '13:00-15:00', status: 'confirmed' },
];

const RoomSync = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState('faculty');
  const [selectedRoom, setSelectedRoom] = useState<typeof allRooms[0] | null>(null);
  const [bookings, setBookings] = useState(mockBookings);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState('2024-09-01');
  const [selectedTime, setSelectedTime] = useState('09:00-11:00');
  const [eventDetails, setEventDetails] = useState('');

  // FAQ data
  const faqData = [
    {
      question: "How do I book a room?",
      answer: "Faculty and admin users can book rooms by navigating to the Booking page, selecting a room, choosing date/time, and adding event details."
    },
    {
      question: "Can students book rooms?",
      answer: "No, only faculty members and administrators have booking privileges. Students can view room availability and schedules."
    },
    {
      question: "How do I check room availability?",
      answer: "You can check availability through the Dashboard calendar view or the Blueprint interactive map. Green indicates available, red means booked, and yellow shows pending bookings."
    },
    {
      question: "What happens if there's a booking conflict?",
      answer: "The system automatically checks for conflicts and will prevent double bookings. You'll receive an alert if you try to book an occupied time slot."
    }
  ];

  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleBookRoom = () => {
    if (!selectedRoom || !eventDetails.trim()) {
      showNotification('Please fill in all required fields', 'error');
      return;
    }

    // Check for conflicts
    const conflict = bookings.find((booking: typeof mockBookings[0]) => 
      booking.roomId === selectedRoom.id && 
      booking.date === selectedDate && 
      booking.time === selectedTime
    );

    if (conflict) {
      showNotification('Room is already booked for this time slot', 'error');
      return;
    }

    const newBooking = {
      id: Date.now(),
      roomId: selectedRoom.id,
      bookedBy: userRole === 'admin' ? 'Admin User' : 'Faculty User',
      event: eventDetails,
      date: selectedDate,
      time: selectedTime,
      status: 'confirmed'
    };

    setBookings([...bookings, newBooking]);
    setShowBookingModal(false);
    setEventDetails('');
    showNotification('Room booked successfully! Confirmation email sent.');
  };

  const getRoomStatus = (roomId: string) => {
    const roomBookings = bookings.filter((booking: typeof mockBookings[0]) => booking.roomId === roomId && booking.date === selectedDate);
    if (roomBookings.length === 0) return 'available';
    if (roomBookings.some((booking: typeof mockBookings[0]) => booking.status === 'pending')) return 'pending';
    return 'booked';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-emerald-500';
      case 'booked': return 'bg-red-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const Navbar = () => (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${darkMode ? 'bg-gray-900/95 border-b border-gray-700' : 'bg-white/95 border-b border-gray-200 shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-sm border-2 border-white"></div>
            </div>
            <h1 className={`text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent`}>
              RoomSync
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {['dashboard', 'about', 'booking', 'blueprint', 'support', 'calendar'].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`capitalize transition-all duration-200 hover:scale-105 ${
                  currentPage === page
                    ? 'text-indigo-600 font-semibold'
                    : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {page === 'dashboard' ? 'Home' : page}
              </button>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg transition-all duration-200 hover:bg-gray-700"
            >
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-300" />}
            </button>

            {/* Role Selector */}
            <select 
              value={userRole} 
              onChange={(e) => setUserRole(e.target.value)}
              className={`px-3 py-1 rounded-lg text-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900 border border-gray-300'}`}
            >
              <option value="faculty">Faculty</option>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
            </select>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-all duration-200"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className={`md:hidden pb-4 ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
            {['dashboard', 'about', 'booking', 'blueprint', 'support', 'calendar'].map((page) => (
              <button
                key={page}
                onClick={() => {
                  setCurrentPage(page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 capitalize transition-all duration-200 ${
                  currentPage === page
                    ? 'text-indigo-600 font-semibold'
                    : darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {page === 'dashboard' ? 'Home' : page}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );

  const Dashboard = () => {
    const totalRooms = allRooms.length;
    const activeBookings = bookings.filter(b => b.status === 'confirmed').length;
    const freeSlots = totalRooms - activeBookings;

    return (
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center py-16 px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
              RoomSync
            </span>
            <span className={darkMode ? 'text-white' : 'text-gray-900'}> — Smart Room Booking</span>
          </h1>
          <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Easily book classrooms, seminar halls, and labs with conflict-free scheduling
          </p>
          <button
            onClick={() => setCurrentPage('booking')}
            className="bg-gradient-to-r from-indigo-600 to-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
          {[
            { title: 'Total Rooms', value: totalRooms, icon: Building, color: 'from-blue-500 to-cyan-500' },
            { title: 'Active Bookings', value: activeBookings, icon: Calendar, color: 'from-green-500 to-emerald-500' },
            { title: 'Free Slots', value: freeSlots, icon: CheckCircle, color: 'from-purple-500 to-pink-500' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:scale-105 transform transition-all duration-300 shadow-lg hover:shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.title}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Calendar View */}
        <div className={`mx-4 rounded-2xl p-6 shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-indigo-600" />
            Room Availability
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allRooms.slice(0, 12).map((room) => {
              const status = getRoomStatus(room.id);
              return (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                    status === 'available' ? 'border-emerald-500 bg-emerald-50' :
                    status === 'pending' ? 'border-yellow-500 bg-yellow-50' :
                    'border-red-500 bg-red-50'
                  } ${darkMode ? 'bg-opacity-10' : ''}`}
                >
                  <div className="text-center">
                    <p className="font-semibold">{room.name}</p>
                    <p className="text-sm text-gray-600 capitalize">{room.type}</p>
                    <div className={`w-3 h-3 rounded-full mx-auto mt-2 ${getStatusColor(status)}`}></div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Booked</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="px-4">
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Book Room', page: 'booking', icon: Calendar, disabled: userRole === 'student' },
              { name: 'View Blueprint', page: 'blueprint', icon: MapPin },
              { name: 'About Project', page: 'about', icon: Building },
              { name: 'Get Support', page: 'support', icon: MessageSquare }
            ].map((link, idx) => (
              <button
                key={idx}
                onClick={() => !link.disabled && setCurrentPage(link.page)}
                disabled={link.disabled}
                className={`p-4 rounded-xl text-center transition-all duration-200 hover:scale-105 ${
                  link.disabled 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:shadow-lg'
                } ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border border-gray-200'}`}
              >
                <link.icon className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
                <p className="font-semibold">{link.name}</p>
                {link.disabled && <p className="text-xs text-red-500 mt-1">Faculty Only</p>}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const BookingPage = () => {
    if (userRole === 'student') {
      return (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className={`text-center p-8 rounded-2xl ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-md border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Access Restricted</h2>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Only faculty and administrators can book rooms.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Book a Room</h1>
        
        <div className={`rounded-2xl p-8 shadow-lg ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}>
          <div className="space-y-6">
            {/* Room Selection */}
            <div>
              <label className="block text-sm font-medium mb-2 text-white">Select Room</label>
              <select
                value={selectedRoom?.id || ''}
                onChange={(e) => setSelectedRoom(allRooms.find(r => r.id === e.target.value) || null)}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              >
                <option value="">Choose a room...</option>
                {allRooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name} - {room.type} (Capacity: {room.capacity})
                  </option>
                ))}
              </select>
            </div>

            {/* Date Picker */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              />
            </div>

            {/* Time Picker */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Time Slot</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              >
                <option value="09:00-11:00">09:00 - 11:00</option>
                <option value="11:00-13:00">11:00 - 13:00</option>
                <option value="13:00-15:00">13:00 - 15:00</option>
                <option value="15:00-17:00">15:00 - 17:00</option>
              </select>
            </div>

            {/* Event Details */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Event Details</label>
              <textarea
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
                placeholder="Enter event description..."
                rows={4}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'}`}
              />
            </div>

            {/* Book Button */}
            <button
              onClick={handleBookRoom}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-4 rounded-xl font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  const BlueprintView = () => (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Interactive Campus Map</h1>
      
      {/* X-Block */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Building className="w-6 h-6 text-indigo-600" />
          X-Block
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {roomsData['X-Block'].map((room) => {
            const status = getRoomStatus(room.id);
            return (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 border-2 ${
                  status === 'available' ? 'border-emerald-500 bg-emerald-50' :
                  status === 'pending' ? 'border-yellow-500 bg-yellow-50' :
                  'border-red-500 bg-red-50'
                } ${darkMode ? 'bg-opacity-10' : ''} shadow-md hover:shadow-lg`}
              >
                <div className="text-center">
                  <p className="font-bold">{room.name}</p>
                  <p className="text-sm text-gray-600 capitalize">{room.type}</p>
                  <p className="text-xs text-gray-500">Cap: {room.capacity}</p>
                  <div className={`w-3 h-3 rounded-full mx-auto mt-2 ${getStatusColor(status)}`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Y-Block */}
      <div>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Building className="w-6 h-6 text-emerald-600" />
          Y-Block
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {roomsData['Y-Block'].map((room) => {
            const status = getRoomStatus(room.id);
            return (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 border-2 ${
                  status === 'available' ? 'border-emerald-500 bg-emerald-50' :
                  status === 'pending' ? 'border-yellow-500 bg-yellow-50' :
                  'border-red-500 bg-red-50'
                } ${darkMode ? 'bg-opacity-10' : ''} shadow-md hover:shadow-lg`}
              >
                <div className="text-center">
                  <p className="font-bold">{room.name}</p>
                  <p className="text-sm text-gray-600 capitalize">{room.type}</p>
                  <p className="text-xs text-gray-500">Cap: {room.capacity}</p>
                  <div className={`w-3 h-3 rounded-full mx-auto mt-2 ${getStatusColor(status)}`}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">About RoomSync</h1>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Project Context */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-indigo-600">Project Context</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Background</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                Classroom and lab scheduling is complex, often resulting in overlapping bookings and miscommunication. 
                The current method of booking a lab or classroom is manual, leading to conflicts and inefficient resource utilization.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Problem Statement</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                There is no smart interface for conflict-free room allocation. Colleges lack a centralized view of room availability, 
                resulting in scheduling conflicts and poor resource management.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Solution</h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} leading-relaxed`}>
                A web platform with drag-and-drop interfaces for dynamic room booking, offering real-time conflict checking, 
                smart recommendations, and an intuitive availability calendar system.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Key Features</h3>
              <ul className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-2`}>
                <li>• Timetable uploader with conflict detection</li>
                <li>• Auto conflict checker for scheduling</li>
                <li>• Interactive room availability calendar</li>
                <li>• Email confirmation system</li>
                <li>• Role-based access control</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-purple-600">Development Team</h2>
          
          <div className="space-y-6">
            {[
              { name: 'Noorsharma Ansari', id: '29802B0044', role: 'Project Lead & Backend Developer' },
              { name: 'Sneha Singh', id: '29302C0008', role: 'Frontend Developer & UI/UX Designer' },
              { name: 'Mohd Ovais Shaikh', id: '29302B0058', role: 'Full Stack Developer & Database Designer' }
            ].map((member, idx) => (
              <div key={idx} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>ID: {member.id}</p>
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={`mt-8 p-4 rounded-xl ${darkMode ? 'bg-indigo-900/30' : 'bg-indigo-50'} border ${darkMode ? 'border-indigo-700' : 'border-indigo-200'}`}>
            <h3 className="font-semibold text-lg mb-2 text-indigo-600">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'JavaScript', 'Tailwind CSS', 'Django/ASP.NET', 'MySQL'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-indigo-600 text-white rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const SupportPage = () => {
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!contactForm.name || !contactForm.email || !contactForm.message) {
        showNotification('Please fill in all fields', 'error');
        return;
      }
      showNotification('Message sent successfully! We\'ll get back to you soon.');
      setContactForm({ name: '', email: '', message: '' });
    };

    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Support & Help</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Mail className="w-6 h-6 text-indigo-600" />
              Contact Us
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
                  placeholder="your.email@college.edu"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 placeholder-gray-500'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none`}
                  placeholder="How can we help you?"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-purple-600" />
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqData.map((faq, idx) => (
                <div key={idx} className={`border rounded-xl ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === idx ? null : idx)}
                    className={`w-full px-4 py-3 text-left flex items-center justify-between hover:${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} transition-all duration-200 rounded-xl`}
                  >
                    <span className="font-medium">{faq.question}</span>
                    {expandedFAQ === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {expandedFAQ === idx && (
                    <div className={`px-4 pb-3 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const RoomDetailsModal = () => {
    if (!selectedRoom) return null;

    const roomBookings = bookings.filter(booking => booking.roomId === selectedRoom.id);
    const status = getRoomStatus(selectedRoom.id);

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">{selectedRoom.name}</h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} capitalize`}>
                {selectedRoom.type} • Capacity: {selectedRoom.capacity}
              </p>
            </div>
            <button
              onClick={() => setSelectedRoom(null)}
              className={`p-2 rounded-lg hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-all duration-200`}
            >
              <X size={24} />
            </button>
          </div>

          {/* Room Status */}
          <div className={`mb-6 p-4 rounded-xl ${
            status === 'available' ? 'bg-emerald-50 border-emerald-200' :
            status === 'pending' ? 'bg-yellow-50 border-yellow-200' :
            'bg-red-50 border-red-200'
          } border-2 ${darkMode ? 'bg-opacity-10' : ''}`}>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${getStatusColor(status)}`}></div>
              <span className="font-semibold capitalize">{status}</span>
            </div>
          </div>

          {/* Current Bookings */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Current Bookings</h3>
            {roomBookings.length === 0 ? (
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} italic`}>No bookings for this room</p>
            ) : (
              <div className="space-y-3">
                {roomBookings.map((booking) => (
                  <div key={booking.id} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">{booking.event}</p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Booked by: {booking.bookedBy}
                        </p>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {booking.date} • {booking.time}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Book Now Button */}
          {(userRole === 'faculty' || userRole === 'admin') && (
            <button
              onClick={() => {
                setShowBookingModal(true);
                setSelectedRoom(null);
              }}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Book This Room
            </button>
          )}
        </div>
      </div>
    );
  };

  const BookingModal = () => {
    if (!showBookingModal) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Quick Book Room</h2>
            <button
              onClick={() => setShowBookingModal(false)}
              className={`p-2 rounded-lg hover:${darkMode ? 'bg-gray-700' : 'bg-gray-100'} transition-all duration-200`}
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Room</label>
              <select
                value={selectedRoom?.id || ''}
                onChange={(e) => setSelectedRoom(allRooms.find(r => r.id === e.target.value) || null)}
                className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200`}
              >
                <option value="">Choose a room...</option>
                {allRooms.map((room) => (
                  <option key={room.id} value={room.id}>
                    {room.name} - {room.type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Time Slot</label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
              >
                <option value="09:00-11:00">09:00 - 11:00</option>
                <option value="11:00-13:00">11:00 - 13:00</option>
                <option value="13:00-15:00">13:00 - 15:00</option>
                <option value="15:00-17:00">15:00 - 17:00</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Event Details</label>
              <textarea
                value={eventDetails}
                onChange={(e) => setEventDetails(e.target.value)}
                placeholder="Enter event description..."
                rows={3}
                className={`w-full px-4 py-3 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 placeholder-gray-500'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none`}
              />
            </div>

            <button
              onClick={handleBookRoom}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 text-white py-3 rounded-xl font-semibold hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  const Notification = () => {
    if (!notification) return null;

    return (
      <div className={`fixed top-4 right-4 z-50 p-4 rounded-xl shadow-lg transform transition-all duration-300 ${
        notification.type === 'success' 
          ? 'bg-emerald-500 text-white' 
          : 'bg-red-500 text-white'
      }`}>
        <div className="flex items-center gap-2">
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{notification.message}</span>
        </div>
      </div>
    );
  };

  const CalendarView = () => (
    <div className={`min-h-screen flex justify-center items-start py-8 px-4 md:py-16 md:px-6 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}>
      <div className={`w-full max-w-6xl rounded-lg border shadow-xl p-6 md:p-8 flex flex-col md:flex-row gap-8 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
        {/* Calendar Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h2 className={`text-2xl md:text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Room Booking Calendar
            </h2>
            <div className="flex space-x-3">
              <button className={`px-4 py-2 rounded-md font-medium transition-colors ${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 border border-gray-300'}`}>
                ← Previous
              </button>
              <button className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 border border-blue-600 font-medium transition-colors">
                Next →
              </button>
            </div>
          </div>

          {/* Week Days */}
          <div className={`grid grid-cols-7 gap-1 text-center font-semibold mb-4 text-sm md:text-base border-b pb-2 ${darkMode ? 'text-gray-400 border-gray-700' : 'text-gray-600 border-gray-300'}`}>
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
            {Array.from({ length: 35 }, (_, i) => (
              <div
                key={i}
                className={`cursor-pointer rounded-md p-3 md:p-4 border-2 transition-all duration-200 font-medium ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 border-gray-600 hover:border-gray-500 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 border-gray-300 hover:border-gray-400 text-gray-700'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Side Panel */}
        <div className={`w-full md:w-1/3 rounded-lg p-6 shadow-lg ${darkMode ? 'bg-gray-700 border border-gray-600' : 'bg-gray-100 border border-gray-300'}`}>
          <div className="text-center py-8">
            <div className="text-gray-500 text-6xl mb-4">📅</div>
            <p className={`font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Select a date to view availability</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'about':
        return <AboutPage />;
      case 'booking':
        return <BookingPage />;
      case 'blueprint':
        return <BlueprintView />;
      case 'support':
        return <SupportPage />;
      case 'calendar':
        return <CalendarView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'}`}>
      <Navbar />
      
      <main className="pb-8">
        {renderPage()}
      </main>

      {/* Modals */}
      <RoomDetailsModal />
      <BookingModal />
      
      {/* Notifications */}
      <Notification />
    </div>
  );
};

export default RoomSync;