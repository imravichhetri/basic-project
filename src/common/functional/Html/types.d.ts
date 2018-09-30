interface ILoadableBundles {
	id?: number;
	name?: string;
	file: string;
	publicPath: string;
}

export interface IProps {
	content:string;
	config: object;
	initialState: object;
	loadableBundles: ILoadableBundles[];
}
