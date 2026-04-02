
type ContextsProps = {
	children: React.ReactNode;
};
export function ContextsProvider({ children }: ContextsProps) {
	return (
		<>
													{children}
    </>
												
	);
}
