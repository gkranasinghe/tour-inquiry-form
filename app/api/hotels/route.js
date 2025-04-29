import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import connectDB from '@/app/lib/mongodb';
import Hotel from '@/app/models/Hotel';

export async function GET() {
  try {
    await connectDB();
    const hotels = await Hotel.find().sort({ createdAt: -1 });
    return NextResponse.json(hotels);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch hotels' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession();
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    await connectDB();
    const hotel = await Hotel.create(body);
    return NextResponse.json(hotel, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create hotel' },
      { status: 500 }
    );
  }
} 