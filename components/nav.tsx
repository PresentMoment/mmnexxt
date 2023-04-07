import Link from 'next/link'

export default function Navigation(){
  return(
    <div className="navigation">
    <Link href="/" >
      MMXX
    </Link>
    <span className="navSpacer" />
    <Link href="/contact" >
      Contact
    </Link>
  </div>
  )
}