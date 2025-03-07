import {Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Textarea} from "@/components/ui/textarea";


export default function FeedbackComponent(){
    const [opinion, setOpinion] = useState("");
    const [email, setEmail] = useState("");
    const handleSubmit = () => {
        if(!email.trim())
            alert("Please enter your email address!");
        if(!opinion.trim())
            alert("Please enter your feedback!");
        alert("Successfully send!");
    }
    return (
        <Dialog >
            <DialogTrigger>
                Support
            </DialogTrigger>
            <DialogContent className="bg-white text-black">
                <DialogTitle className="text-2xl">Support</DialogTitle>
                <div className="grid gap-2">
                    <Label className="text-l font-bold" htmlFor="email">Email: </Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        className="border-gray-300 shadow-sm"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="grid gap-2 ">
                    <Label className="text-l font-bold" htmlFor="feedback">Feedback: </Label>
                    <Textarea
                        id="opinion"
                        placeholder="Enter your feedback..."
                        required
                        className="border-gray-300 shadow-sm h-60 resize-none overflow-auto"
                        onChange={(e) => setOpinion(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <div className="flex justify-end">
                        <Button onClick={handleSubmit}>
                            Send
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}