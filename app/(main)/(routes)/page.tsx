import { UserButton } from "@clerk/nextjs";

export default function Page() {

	return (
        <div>
            Root Page
            <UserButton afterSignOutUrl="/"/>
        </div>
    ) 
}
