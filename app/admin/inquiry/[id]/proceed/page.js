"use client";

import { useRouter, useParams } from "next/navigation";

export default function ProceedPage() {
  // In a real app, these would come from navigation state or query params
  // For skeleton UI, use placeholder data
  const inquiry = {
    name: "Sweena Travels",
    arrivalDate: "2025-04-02",
    departureDate: "2025-04-07",
    numberOfAdults: 18,
    numberOfKids: 2,
    status: "pending",
    createdAt: "2025-03-01T10:00:00Z",
    numberOfNights: 5,
  };

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Proceed with Inquiry: {inquiry.name}</h2>
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <div><span className="font-semibold">Arrival:</span> {new Date(inquiry.arrivalDate).toLocaleDateString()}</div>
          <div><span className="font-semibold">Departure:</span> {new Date(inquiry.departureDate).toLocaleDateString()}</div>
          <div><span className="font-semibold">No. of Pax:</span> {inquiry.numberOfAdults + inquiry.numberOfKids}</div>
        </div>
        <div>
          <div><span className="font-semibold">Status:</span> <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
            ${inquiry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
              inquiry.status === 'approved' ? 'bg-green-100 text-green-800' : 
              inquiry.status === 'rejected' ? 'bg-red-100 text-red-800' : 
              'bg-gray-100 text-gray-800'}`}>{inquiry.status}</span></div>
          <div><span className="font-semibold">Created At:</span> {new Date(inquiry.createdAt).toLocaleString()}</div>
        </div>
      </div>
      <div className="mt-8">
        {/* Skeleton for travel details table */}
        <div className="bg-gray-100 rounded p-6 text-gray-400 text-center">
          Travel details table will appear here.
        </div>
      </div>
    </div>
  );
} 