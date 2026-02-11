import { NextResponse } from "next/server";

export async function GET() {
    const shops = [
        {
            id: 1,
            name: "Rumah Dadih",
            description: "Dadih Susu Berlemak Pelbagai Perisa",
            icon: "🥛",
            isOpen: true,
        },
        {
            id: 2,
            name: "Ice Cream Corner",
            description: "Homemade scoops for neighbours",
            icon: "🍦",
            isOpen: true,
        },
    ];

    return NextResponse.json(shops);
}