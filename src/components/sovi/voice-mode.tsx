import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSovi } from "@/lib/sovi/store";
import { HorizonWave } from "./presence";
import { SoviMark } from "./mark";

type Rec = {
  start: () => void;
  stop: () => void;
  onresult: ((ev: { results: ArrayLike<{ 0: { transcript: string }; isFinal: boolean }> }) => void) | null;
};

function getRecognition(): Rec | null {
  if (typeof window === "undefined") return null;
  const Ctor =
    (window as unknown as { SpeechRecognition?: new () => Rec; webkitSpeechRecognition?: new () => Rec })
      .SpeechRecognition ||
    (window as unknown as { webkitSpeechRecognition?: new () => Rec }).webkitSpeechRecognition;
  if (!Ctor) return null;
  return new Ctor();
}

export function VoiceMode() {
  const open = useSovi((s) => s.voiceMode);
  const setOpen = useSovi((s) => s.setVoiceMode);
  const presence = useSovi((s) => s.presence);
  const send = useSovi((s) => s.sendMessage);
  const speak = useSovi((s) => s.speak);
  const flags = useSovi((s) => s.flags);
  const [transcript, setTranscript] = useState("");
  const [listening, setListening] = useState(false);
  const recRef = useRef<Rec | null>(null);

  useEffect(() => {
    if (!open) {
      recRef.current?.stop();
      setListening(false);
      return;
    }
    const rec = getRecognition();
    recRef.current = rec;
    if (!rec) return;
    rec.onresult = (ev) => {
      const last = ev.results[ev.results.length - 1];
      if (!last) return;
      const text = last[0].transcript;
      setTranscript(text);
      if (last.isFinal) {
        setListening(false);
        rec.stop();
        void (async () => {
          const cid = await send({ text });
          const msgs = useSovi.getState().messagesByConversation[cid] ?? [];
          const lastA = [...msgs].reverse().find((m) => m.role === "assistant" && m.status === "complete");
          if (lastA?.content) await speak(lastA.content.replace(/[#*`]/g, "").slice(0, 600));
        })();
      }
    };
    return () => rec.stop();
  }, [open, send, speak]);

  if (!open || !flags.voice) return null;

  const start = () => {
    setTranscript("");
    setListening(true);
    recRef.current?.start();
  };

  const stop = () => {
    recRef.current?.stop();
    setListening(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background pt-safe">
      <div className="flex justify-end p-3">
        <Button variant="ghost" size="icon" aria-label="Close voice" onClick={() => setOpen(false)}>
          <X className="size-5" />
        </Button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-6 pb-16">
        <div className={`sovi-presence-${listening ? "listening" : presence}`}>
          <SoviMark size={64} />
        </div>
        <HorizonWave active={listening || presence === "speaking"} className="w-full max-w-sm" />
        <p className="min-h-12 max-w-md text-center text-lg text-foreground">
          {transcript || (listening ? "Listening…" : presence === "speaking" ? "Speaking…" : "Tap the microphone")}
        </p>
        <Button
          size="lg"
          className="size-16 rounded-full"
          variant={listening ? "secondary" : "default"}
          aria-label={listening ? "Stop listening" : "Start listening"}
          onClick={() => (listening ? stop() : start())}
        >
          {listening ? <MicOff className="size-6" /> : <Mic className="size-6" />}
        </Button>
      </div>
    </div>
  );
}
