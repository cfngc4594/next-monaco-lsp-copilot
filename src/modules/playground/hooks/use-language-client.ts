import { type MonacoLanguageClient } from "monaco-languageclient";
import { useCallback, useEffect, useRef } from "react";
import { type MessageTransports } from "vscode-languageclient";
import {
  toSocket,
  WebSocketMessageReader,
  WebSocketMessageWriter,
} from "vscode-ws-jsonrpc";

interface useLanguageServerProps {
  enabled: boolean;
  endpoint?: string;
  language?: string;
}

export const useLanguageServer = ({
  enabled,
  endpoint,
  language,
}: useLanguageServerProps) => {
  const webSocketRef = useRef<WebSocket | null>(null);
  const languageClientRef = useRef<MonacoLanguageClient | null>(null);

  const createLanguageClient = useCallback(
    async (language: string, transports: MessageTransports) => {
      const [{ MonacoLanguageClient }, { ErrorAction, CloseAction }] =
        await Promise.all([
          import("monaco-languageclient"),
          import("vscode-languageclient"),
        ]);

      return new MonacoLanguageClient({
        name: `${language} language client`,
        clientOptions: {
          documentSelector: [language],
          errorHandler: {
            error: () => ({ action: ErrorAction.Continue }),
            closed: () => ({ action: CloseAction.DoNotRestart }),
          },
        },
        connectionProvider: {
          get: () => Promise.resolve(transports),
        },
      });
    },
    []
  );

  const startLanguageClient = useCallback(
    async (endpoint: string, language: string) => {
      const webSocket = new WebSocket(endpoint);

      webSocket.onopen = async () => {
        const socket = toSocket(webSocket);
        const reader = new WebSocketMessageReader(socket);
        const writer = new WebSocketMessageWriter(socket);

        const languageClient = await createLanguageClient(language, {
          reader,
          writer,
        });

        await languageClient.start();
        languageClientRef.current = languageClient;
      };

      webSocketRef.current = webSocket;
    },
    [createLanguageClient]
  );

  const cleanupLanguageClient = useCallback(async () => {
    const prevClient = languageClientRef.current;
    const prevSocket = webSocketRef.current;

    languageClientRef.current = null;
    webSocketRef.current = null;

    const { State } = await import("vscode-languageclient");

    if (prevClient && prevClient.state !== State.Stopped) {
      await prevClient.stop();
    }

    if (prevSocket && prevSocket.readyState === WebSocket.OPEN) {
      prevSocket.close();
    }
  }, []);

  useEffect(() => {
    if (!enabled || !endpoint || !language) return;

    startLanguageClient(endpoint, language);

    return () => {
      cleanupLanguageClient();
    };
  }, [cleanupLanguageClient, enabled, endpoint, language, startLanguageClient]);

  return { languageClient: languageClientRef.current };
};
