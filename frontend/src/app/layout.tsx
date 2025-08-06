import {
  ClerkProvider,
} from '@clerk/nextjs'

import './global.css'
import Navbar from "./Navbar";
export const metadata = {
    title: 'Resume Revamp',
    description: 'Revamp your resume with our AI-powered tools and templates.',
}

export default function RootLayout({ children }) {
    return (
        <ClerkProvider>
        <html lang="en">
            <body className="dark">
                <Navbar />
                {children}
            </body>
        </html>
        </ClerkProvider>
    )
}   