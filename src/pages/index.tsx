import { Inter } from 'next/font/google'
import Header from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Header selectedPage={"home"} />
      <div className=" h-80 bg-blue-500  pb-20 px-5 pt-20 shadow-blue-400 shadow-xl" style={{clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)"}}>
        <h1 className="text-white text-4xl font-bold">Polygon Div with TailwindCSS</h1>
        <p className="text-white text-lg mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in quam ac neque fermentum.</p>
      </div>
    </div>
  )
}
