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
    console.error('Error fetching hotels:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hotels', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession();
    if (!session || session.user.role !== 'admin') {
      console.error('Unauthorized access attempt');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await req.json();
    console.log('Received hotel data:', body);
    
    await connectDB();
    const hotel = await Hotel.create(body);
    console.log('Hotel created successfully:', hotel);
    
    return NextResponse.json(hotel, { status: 201 });
  } catch (error) {
    console.error('Error creating hotel:', error);
    return NextResponse.json(
      { error: 'Failed to create hotel', details: error.message },
      { status: 500 }
    );
  }
} 