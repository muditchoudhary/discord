import { Server, Profile, Member, Channel } from "@prisma/client"

export type ServerWithMemebersWithProfiles = Server & {
    members: (Member & {profile: Profile})[];
}