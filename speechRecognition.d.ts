declare global {
    interface Window {
      SpeechRecognition: typeof SpeechRecognition | undefined;
      webkitSpeechRecognition: typeof SpeechRecognition | undefined;
    }
  
    interface SpeechRecognitionEvent extends Event {
      results: SpeechRecognitionResultList;
    }
  
    interface SpeechRecognitionResultList {
      0: SpeechRecognitionResult;
    }
  
    interface SpeechRecognitionResult {
      transcript: string;
      confidence: number;
    }
  
    interface SpeechRecognition extends EventTarget {
      lang: string;
      interimResults: boolean;
      start(): void;
      stop(): void;
      onresult: (event: SpeechRecognitionEvent) => void;
      onstart: () => void;
      onend: () => void;
      onerror: (event: Event) => void;
    }
  
    var SpeechRecognition: {
      prototype: SpeechRecognition;
      new (): SpeechRecognition;
    };
  
    var webkitSpeechRecognition: {
      prototype: SpeechRecognition;
      new (): SpeechRecognition;
    };
  }
  
  export {};
  