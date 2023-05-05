import { useSocketio } from "./shared-clients";

export function emitEvent(name: string, args?: any): void {
    const socket = useSocketio();

    switch(name) {
        case "ping":
            socket.emit(name);
            console.log("Ping emitted!");
            break;
        default:
            break;
    }
}