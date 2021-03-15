import { createContext } from 'react'
import JSON from './cost-of-living'

const JSONContext = createContext(JSON);

export const JSONProvider = JSONContext.Provider;
export default JSONContext;