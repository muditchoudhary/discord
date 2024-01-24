import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const { imageUrl, name } = await req.json();
        const userProfile = await currentProfile();

        if (!userProfile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const server = await db.server.create({
            data: {
                name: name,
                imageUrl: imageUrl,
                inviteCode: uuidv4(),
                profileId: userProfile.id,
                members: {
                    create: [
                        { role: MemberRole.ADMIN, profileId: userProfile.id }
                    ]
                },
                channels: {
                    create: [
                        { name: "general", profileId: userProfile.id }
                    ]
                }


            }
        })

        return NextResponse.json(server);
    } catch (error) {
        console.log("SERVERS_POST ", error);
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}