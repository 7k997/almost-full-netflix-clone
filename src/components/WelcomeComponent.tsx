import Input from "@/components/Input";
import Image from "next/image";

function WelcomeComponent() {
    function openFormWithData(email: String) {
        // blablabla
    }
    return (
        <div className="flex flex-col justify-center items-center px-6 pt-9 text-center gap-3">
            <h1 className="text-[2rem]/[2.7rem] font-bold">Unlimited movies, TV shows, and more</h1>
            <p className="text-lg font-medium">Watch anywhere. Cancel anytime.</p>
            <div className="px-6 mt-2">
                <h3 className="text-lg font-medium">Ready to watch? Enter your email to create or restart your membership</h3>
            </div>
            <div className="mt-1">
                <form>
                    <Input id="herosectionemail" label="Email" value="GlobalStoreName" type="email" />
                    <button onClick={() => {}} className="text-lg font-bold px-4 mt-4 mb-12 py-2 bg-netflix_red rounded">Get Started<Image className="inline ml-2" src="/arrow-right.svg" alt="" width={24} height={24} />
                    </button>
                </form>
            </div>
        </div>
    )
}
export default WelcomeComponent