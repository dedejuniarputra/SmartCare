import { createContext, useContext, type ReactNode } from "react";

const PageReadyContext = createContext<boolean>(false);

export function PageReadyProvider({
  isReady,
  children,
}: {
  isReady: boolean;
  children: ReactNode;
}) {
  return (
    <PageReadyContext.Provider value={isReady}>
      {children}
    </PageReadyContext.Provider>
  );
}

export function usePageReady() {
  return useContext(PageReadyContext);
}

