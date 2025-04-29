'use client';

import { useState } from 'react';
import { FaSearch, FaCalendarAlt, FaUser } from 'react-icons/fa';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    arrivalDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    departureDate: '',
    numberOfNights: '',
    numberOfAdults: '',
    numberOfKids: '',
    kidsAges: {
      below12: 0,
      below5: 0,
      below2: 0
    }
  });

  const [showGuestOptions, setShowGuestOptions] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('kids')) {
      setFormData(prev => ({
        ...prev,
        kidsAges: {
          ...prev.kidsAges,
          [name.replace('kids', '').toLowerCase()]: parseInt(value) || 0
        }
      }));
    } else if (name === 'arrivalDate') {
      const newArrivalDate = new Date(value);
      const currentDepartureDate = new Date(formData.departureDate);
      
      setFormData(prev => ({
        ...prev,
        [name]: value,
        departureDate: currentDepartureDate < newArrivalDate ? value : prev.departureDate
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to submit inquiry');

      alert('Inquiry submitted successfully!');
      setFormData({
        name: '',
        arrivalDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        departureDate: '',
        numberOfNights: '',
        numberOfAdults: '',
        numberOfKids: '',
        kidsAges: {
          below12: 0,
          below5: 0,
          below2: 0
        }
      });
      setShowGuestOptions(false);
    } catch (error) {
      alert('Error submitting inquiry. Please try again.');
    }
  };

  const totalGuests = parseInt(formData.numberOfAdults || 0) + parseInt(formData.numberOfKids || 0);
  const guestSummary = `${totalGuests} guest${totalGuests !== 1 ? 's' : ''}`;

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-900">Plan Your Sri Lanka Adventure</h1>
        
        <div className="bg-white rounded-full shadow-lg p-2 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="flex items-center">
            {/* Name Input */}
            <div className="flex-1 min-w-0 px-4 border-r border-gray-200">
              <label className="block text-xs font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="block w-full border-0 p-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Date Range */}
            <div className="flex-1 min-w-0 px-4 border-r border-gray-200">
              <label className="block text-xs font-medium text-gray-700">Dates</label>
              <div className="flex items-center space-x-2">
                <FaCalendarAlt className="text-gray-400" />
                <input
                  type="date"
                  name="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="block w-full border-0 p-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  required
                />
                <span className="text-gray-400">→</span>
                <input
                  type="date"
                  name="departureDate"
                  value={formData.departureDate}
                  onChange={handleInputChange}
                  min={formData.arrivalDate}
                  className="block w-full border-0 p-2 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                  required
                />
              </div>
            </div>

            {/* Guests */}
            <div className="flex-1 min-w-0 px-4 relative">
              <label className="block text-xs font-medium text-gray-700">Guests</label>
              <button
                type="button"
                onClick={() => setShowGuestOptions(!showGuestOptions)}
                className="flex items-center w-full p-2 text-left text-gray-900 hover:bg-gray-50 rounded-md"
              >
                <FaUser className="text-gray-400 mr-2" />
                <span>{guestSummary}</span>
              </button>

              {showGuestOptions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-10">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-700">Adults</label>
                      <input
                        type="number"
                        name="numberOfAdults"
                        value={formData.numberOfAdults}
                        onChange={handleInputChange}
                        min="1"
                        className="w-20 p-1 border rounded-md"
                        required
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-gray-700">Kids</label>
                      <input
                        type="number"
                        name="numberOfKids"
                        value={formData.numberOfKids}
                        onChange={handleInputChange}
                        min="0"
                        className="w-20 p-1 border rounded-md"
                      />
                    </div>

                    {parseInt(formData.numberOfKids) > 0 && (
                      <div className="space-y-2 pt-2 border-t">
                        <h4 className="text-sm font-medium text-gray-700">Ages of Kids</h4>
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label className="block text-xs text-gray-600">Below 12</label>
                            <input
                              type="number"
                              name="kidsBelow12"
                              value={formData.kidsAges.below12}
                              onChange={handleInputChange}
                              min="0"
                              className="w-full p-1 border rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600">Below 5</label>
                            <input
                              type="number"
                              name="kidsBelow5"
                              value={formData.kidsAges.below5}
                              onChange={handleInputChange}
                              min="0"
                              className="w-full p-1 border rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-gray-600">Below 2</label>
                            <input
                              type="number"
                              name="kidsBelow2"
                              value={formData.kidsAges.below2}
                              onChange={handleInputChange}
                              min="0"
                              className="w-full p-1 border rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              type="submit"
              className="bg-rose-500 hover:bg-rose-600 text-white p-4 rounded-full flex items-center justify-center transition-colors duration-200"
            >
              <FaSearch className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
} 