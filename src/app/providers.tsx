'use client'

import { QueryClient, QueryClientProvider } from 'react-query'
import React from 'react'

export default function Providers({ children }: any) {
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
