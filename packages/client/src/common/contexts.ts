import { createContext } from 'react';
import { ICurrentUserContext } from './interfaces';

export const CurrentUserContext = createContext<ICurrentUserContext>(
	{} as ICurrentUserContext
);
