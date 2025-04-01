import { Dispatch, SetStateAction, useState } from "react";

export default function useRobotoStream(): RobotoStreamHook {
	const [streamFrame, setStreamFrame] = useState<string | null>(null);
	return { streamFrame, setStreamFrame };
}

export interface RobotoStreamHook {
	streamFrame: string | null;
	setStreamFrame: Dispatch<SetStateAction<string | null>>;
}