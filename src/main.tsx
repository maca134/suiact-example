import Suiact, { useReducer } from '@maca134/suiact';

declare const parentPanel: Panel | undefined;

const Text = ({ text }: { text: string }) => <statictext text={text} />

function counterReducer(state: number, action: { type: 'increment' | 'decrement' } | { type: 'set', value: number }) {
	switch (action.type) {
		case 'increment':
			return state < 10 ? state + 1 : state;
		case 'decrement':
			return state > 0 ? state - 1 : state;
		case 'set':
			return action.value;
		default:
			return state;
	}
}

function Demo() {
	const [counter, dispatch] = useReducer(counterReducer, 0);

	const items = [] as JSX.Element[];
	for (let i = 0; i < counter; i++) {
		items.push(<Text text={`Line: ${i + 1}`} />);
	}

	return (
		<window
			usePanel={parentPanel}
			type="window"
			text="Demo"
			margins={16}
			orientation="row"
			spacing={10}
			alignChildren={['left', 'top']}
			properties={{ closeButton: true }}>
			<group
				orientation='column'
				alignChildren={['left', 'center']}>
				<slider
					value={counter}
					maxvalue={10}
					onChange={(control) => dispatch({ type: 'set', value: Math.floor(control.value) })}
					alignment={['fill', 'top']} />
				<group
					orientation='row'
					alignChildren={['left', 'center']}>
					<button
						text="Add"
						onClick={() => dispatch({ type: 'increment' })} />
					<button
						text="Remove"
						onClick={() => dispatch({ type: 'decrement' })} />
				</group>
				<>
					{...items}
				</>
			</group>
		</window>
	);
}

Suiact.render(<Demo />);
