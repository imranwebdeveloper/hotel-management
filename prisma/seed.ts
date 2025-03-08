// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create a sample user
  const user = await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      name: "John Doe",
      password: await bcrypt.hash("123456", 10),
      image: "https://example.com/johndoe.jpg",
      provider: "credentials",
    },
  });

  console.log(`Created user with id: ${user.id}`);

  await prisma.property.createMany({
    data: [
      // add more properties

      {
        name: "Luxury Beach Resort",
        address: "123 Ocean Drive, Miami, FL",
        costPerNight: 250.0,
        availableRooms: 10,
        imageUrl: "/img/hotel/1.jpg",
        rating: 4.5,
        ownerId: user.id,
        description:
          "Enjoy the sun-kissed beaches and crystal-clear waters of Miami at our Luxury Beach Resort. With 10 rooms available, you'll have plenty of space to relax and unwind. Each room features a private balcony with stunning ocean views, a flat-screen TV, and a comfortable king-sized bed. The resort also offers a variety of activities, including snorkeling, kayaking, and paddleboarding.",
      },
      {
        name: "Skyline Grand Hotel",
        address: "45 Downtown Street, New York, NY",
        costPerNight: 320.0,
        availableRooms: 5,
        imageUrl: "/img/hotel/2.jpg",
        rating: 4.7,
        ownerId: user.id,
        description:
          "Experience the bright lights and bustling energy of New York City at our Skyline Grand Hotel. With 5 rooms available, you'll have the perfect blend of comfort and convenience. Each room features a stunning view of the Manhattan skyline, a flat-screen TV, and a comfortable king-sized bed. The hotel is also steps away from many of the city's iconic landmarks, including Times Square, the Empire State Building, and Central Park.",
      },
      {
        name: "Mountain View Inn",
        address: "678 Hill Road, Denver, CO",
        costPerNight: 180.0,
        availableRooms: 8,
        imageUrl: "/img/hotel/3.jpg",
        rating: 4.3,
        ownerId: user.id,
        description:
          "Escape to the mountains and enjoy the crisp, clean air and breathtaking views at our Mountain View Inn. With 8 rooms available, you'll have plenty of space to relax and unwind. Each room features a private balcony with stunning mountain views, a flat-screen TV, and a comfortable king-sized bed. The inn is also conveniently located near many of Denver's top attractions, including the Denver Zoo and the Denver Art Museum.",
      },
      {
        name: "Royal Palace Hotel",
        address: "99 Queen’s Avenue, London, UK",
        costPerNight: 400.0,
        availableRooms: 6,
        imageUrl: "/img/hotel/4.jpg",

        rating: 4.8,
        ownerId: user.id,
        description:
          "Experience the grandeur and opulence of London at our Royal Palace Hotel. With 6 rooms available, you'll have the perfect blend of luxury and convenience. Each room features a stunning view of Buckingham Palace, a flat-screen TV, and a comfortable king-sized bed. The hotel is also steps away from many of London's iconic landmarks, including the Tower of London and Big Ben.",
      },
      {
        name: "Sunset Paradise Resort",
        address: "456 Beach Blvd, Malibu, CA",
        costPerNight: 280.0,
        availableRooms: 12,
        imageUrl: "/img/hotel/5.jpg",

        rating: 4.6,
        ownerId: user.id,
        description:
          "Escape to the beach and enjoy the sun-kissed sand and crystal-clear waters of Malibu at our Sunset Paradise Resort. With 12 rooms available, you'll have plenty of space to relax and unwind. Each room features a private balcony with stunning ocean views, a flat-screen TV, and a comfortable king-sized bed. The resort also offers a variety of activities, including surfing, paddleboarding, and kayaking.",
      },
      {
        name: "The Cozy Cabin",
        address: "12 Forest Lane, Aspen, CO",
        costPerNight: 150.0,
        availableRooms: 4,
        imageUrl: "/img/hotel/6.jpg",
        rating: 4.2,
        ownerId: user.id,
        description:
          "Experience the warmth and coziness of the Rocky Mountains at our Cozy Cabin. With 4 rooms available, you'll have plenty of space to relax and unwind. Each room features a private balcony with stunning mountain views, a flat-screen TV, and a comfortable queen-sized bed. The cabin is also conveniently located near many of Aspen's top attractions, including the Aspen Mountain ski resort and the Maroon Bells.",
      },
      {
        name: "City Lights Hotel",
        address: "88 Metro Street, Los Angeles, CA",
        costPerNight: 210.0,
        availableRooms: 9,
        imageUrl: "/img/hotel/7.jpg",

        rating: 4.4,
        ownerId: user.id,
        description:
          "Experience the bright lights and bustling energy of Los Angeles at our City Lights Hotel. With 9 rooms available, you'll have the perfect blend of comfort and convenience. Each room features a stunning view of the Los Angeles skyline, a flat-screen TV, and a comfortable queen-sized bed. The hotel is also steps away from many of LA's iconic landmarks, including the Hollywood Sign, Universal Studios, and the Griffith Observatory.",
      },
      {
        name: "Lakefront Retreat",
        address: "34 Waterfront Drive, Seattle, WA",
        costPerNight: 275.0,
        availableRooms: 7,
        imageUrl: "/img/hotel/8.jpg",
        rating: 4.6,
        ownerId: user.id,
        description:
          "Escape to the shores of Lake Washington and enjoy the serene and peaceful atmosphere at our Lakefront Retreat. With 7 rooms available, you'll have plenty of space to relax and unwind. Each room features a private balcony with stunning lake views, a flat-screen TV, and a comfortable queen-sized bed. The retreat is also conveniently located near many of Seattle's top attractions, including the Space Needle and Pike Place Market.",
      },
      {
        name: "Desert Mirage Hotel",
        address: "22 Oasis Street, Phoenix, AZ",
        costPerNight: 190.0,
        availableRooms: 10,
        imageUrl: "/img/hotel/9.jpg",

        rating: 4.3,
        ownerId: user.id,
        description:
          "Experience the warmth and beauty of the Arizona desert at our Desert Mirage Hotel. With 10 rooms available, you'll have plenty of space to relax and unwind. Each room features a private balcony with stunning desert views, a flat-screen TV, and a comfortable king-sized bed. The hotel is also conveniently located near many of Phoenix's top attractions, including the Phoenix Zoo and the Desert Botanical Garden.",
      },
      {
        name: "Ocean Breeze Inn",
        address: "555 Coastal Road, San Diego, CA",
        costPerNight: 230.0,
        availableRooms: 8,
        imageUrl: "/img/hotel/10.jpg",

        rating: 4.5,
        ownerId: user.id,
        description:
          "Escape to the beach and enjoy the cool ocean breeze and stunning coastal views at our Ocean Breeze Inn. With 8 rooms available, you'll have plenty of space to relax and unwind. Each room features a private balcony with stunning ocean views, a flat-screen TV, and a comfortable king-sized bed. The inn is also conveniently located near many of San Diego's top attractions, including the San Diego Zoo and the USS Midway Museum.",
      },
      {
        name: "Mountain Escape Lodge",
        address: "78 Summit Road, Boulder, CO",
        costPerNight: 200.0,
        availableRooms: 6,
        imageUrl: "/img/hotel/11.jpg",
        rating: 4.4,
        ownerId: user.id,
        description:
          "Escape to the mountains and enjoy the crisp, clean air and breathtaking views at our Mountain Escape Lodge. With 6 rooms available, you'll have plenty of space to relax and unwind. Each room features a private balcony with stunning mountain views, a flat-screen TV, and a comfortable king-sized bed. The lodge is also conveniently located near many of Boulder's top attractions, including the Pearl Street Mall and the Boulder Creek Path.",
      },
      {
        name: "The Elegant Stay",
        address: "101 Luxury Lane, Paris, France",
        costPerNight: 500.0,
        availableRooms: 5,
        imageUrl: "/img/hotel/12.jpg",

        rating: 4.9,
        ownerId: user.id,
        description:
          "Experience the elegance and sophistication of Paris at our Elegant Stay. With 5 rooms available, you'll have the perfect blend of luxury and convenience. Each room features a stunning view of the Eiffel Tower, a flat-screen TV, and a comfortable king-sized bed. The hotel is also steps away from many of Paris' iconic landmarks, including the Louvre Museum and the Arc de Triomphe.",
      },
      {
        name: "Luxury Beach House",
        address: "123 Ocean Drive, Miami, FL",
        costPerNight: 350.0,
        availableRooms: 5,
        imageUrl: "/img/hotel/13.jpg",
        rating: 4.9,
        ownerId: user.id,
        description:
          "Enjoy the sun-kissed beaches and crystal-clear waters of Miami at our Luxury Beach House.",
      },
      {
        name: "Skyline Apartment",
        address: "45 Downtown Street, New York, NY",
        costPerNight: 280.0,
        availableRooms: 3,
        imageUrl: "/img/hotel/14.jpg",
        rating: 4.7,
        ownerId: user.id,
        description:
          "Experience the bright lights and bustling energy of New York City at our Skyline Apartment.",
      },
      {
        name: "Mountain View Chalet",
        address: "678 Hill Road, Denver, CO",
        costPerNight: 200.0,
        availableRooms: 4,
        imageUrl: "/img/hotel/15.jpg",
        rating: 4.5,
        ownerId: user.id,
        description:
          "Escape to the mountains and enjoy the crisp, clean air and breathtaking views at our Mountain View Chalet.",
      },
      {
        name: "Beachside Condo",
        address: "901 Beachside Drive, San Diego, CA",
        costPerNight: 250.0,
        availableRooms: 2,
        imageUrl: "/img/hotel/16.jpg",
        ownerId: user.id,
        description:
          "Relax in style at our Beachside Condo, located just steps from the beach in San Diego.",
      },
      {
        name: "City Center Loft",
        address: "123 Main Street, Chicago, IL",
        costPerNight: 300.0,
        availableRooms: 6,
        imageUrl: "/img/hotel/17.jpg",
        rating: 4.6,
        ownerId: user.id,
        description:
          "Experience the vibrant energy of Chicago at our City Center Loft.",
      },
      {
        name: "Lakefront Cabin",
        address: "456 Lake Drive, Seattle, WA",
        costPerNight: 220.0,
        availableRooms: 3,
        imageUrl: "/img/hotel/18.jpg",
        rating: 4.4,
        ownerId: user.id,
        description:
          "Escape to the lake and enjoy the peaceful surroundings at our Lakefront Cabin.",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
