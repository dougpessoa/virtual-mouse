import { createContext, useCallback, useContext } from "react";

import type * as T from "./types";

const RenameContext = createContext<T.RenameThisTypes>({} as T.RenameThisTypes);

function RenameProvider({ children }: any) {
	const renameThisFunction = useCallback(() => {
		console.log("Context to copy and follow the pattern");
	}, []);

	return (
		<RenameContext.Provider value={{ renameThisFunction }}>
			{children}
		</RenameContext.Provider>
	);
}

const useRename = () => useContext(RenameContext);

export { RenameProvider, RenameContext, useRename };
