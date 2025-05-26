"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const starCategories = ["3 Star", "4 Star", "5 Star", "5 Star Deluxe"];
const basisOptions = ["BB", "HB", "FB", "AI"];

function getDaysArray(start, end) {
  const arr = [];
  let dt = new Date(start);
  while (dt <= end) {
    arr.push(new Date(dt));
    dt.setDate(dt.getDate() + 1);
  }
  return arr;
}

export default function ProceedPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [inquiry, setInquiry] = useState(null);
  const [days, setDays] = useState([]);
  const [travelDetails, setTravelDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiry = async () => {
      try {
        const res = await fetch(`/api/inquiries/${id}`);
        if (!res.ok) throw new Error("Failed to fetch inquiry");
        const data = await res.json();
        setInquiry(data);
        const start = new Date(data.arrivalDate);
        const end = new Date(data.departureDate);
        const daysArr = getDaysArray(start, end);
        setDays(daysArr);
        setTravelDetails(
          daysArr.map((date, idx) => ({
            day: `Day ${idx + 1}`,
            location: "",
            starCategory: starCategories[0],
            hotel: "",
            basis: basisOptions[1],
            sgl: "",
            dbl: "",
            tri: "",
            date: date.toISOString().split("T")[0],
          }))
        );
      } catch (e) {
        alert("Error loading inquiry");
        router.push("/admin/dashboard");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchInquiry();
  }, [id, router]);

  const handleDetailChange = (idx, field, value) => {
    setTravelDetails((prev) =>
      prev.map((row, i) =>
        i === idx ? { ...row, [field]: value } : row
      )
    );
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!inquiry) return null;

  return (
    <div className="max-w-5xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Proceed with Inquiry: {inquiry.name}</h2>
      <div className="mb-4">
        <span className="font-semibold">Arrival:</span> {new Date(inquiry.arrivalDate).toLocaleDateString()}<br />
        <span className="font-semibold">Departure:</span> {new Date(inquiry.departureDate).toLocaleDateString()}<br />
        <span className="font-semibold">No. of Pax:</span> {inquiry.numberOfAdults + inquiry.numberOfKids}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">Day</th>
              <th className="border px-2 py-1">Location</th>
              <th className="border px-2 py-1">Star Category</th>
              <th className="border px-2 py-1">Hotel</th>
              <th className="border px-2 py-1">Basis</th>
              <th className="border px-2 py-1">SGL</th>
              <th className="border px-2 py-1">DBL</th>
              <th className="border px-2 py-1">Tri</th>
              <th className="border px-2 py-1">Date</th>
            </tr>
          </thead>
          <tbody>
            {travelDetails.map((row, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1">{row.day}</td>
                <td className="border px-2 py-1">
                  <input type="text" className="w-32 border rounded p-1" value={row.location} onChange={e => handleDetailChange(idx, "location", e.target.value)} />
                </td>
                <td className="border px-2 py-1">
                  <select className="w-28 border rounded p-1" value={row.starCategory} onChange={e => handleDetailChange(idx, "starCategory", e.target.value)}>
                    {starCategories.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </td>
                <td className="border px-2 py-1">
                  <input type="text" className="w-32 border rounded p-1" value={row.hotel} onChange={e => handleDetailChange(idx, "hotel", e.target.value)} />
                </td>
                <td className="border px-2 py-1">
                  <select className="w-20 border rounded p-1" value={row.basis} onChange={e => handleDetailChange(idx, "basis", e.target.value)}>
                    {basisOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </td>
                <td className="border px-2 py-1">
                  <input type="number" className="w-16 border rounded p-1" value={row.sgl} onChange={e => handleDetailChange(idx, "sgl", e.target.value)} />
                </td>
                <td className="border px-2 py-1">
                  <input type="number" className="w-16 border rounded p-1" value={row.dbl} onChange={e => handleDetailChange(idx, "dbl", e.target.value)} />
                </td>
                <td className="border px-2 py-1">
                  <input type="number" className="w-16 border rounded p-1" value={row.tri} onChange={e => handleDetailChange(idx, "tri", e.target.value)} />
                </td>
                <td className="border px-2 py-1">
                  <input type="date" className="w-32 border rounded p-1" value={row.date} onChange={e => handleDetailChange(idx, "date", e.target.value)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Save button will be added in the next step */}
    </div>
  );
} 