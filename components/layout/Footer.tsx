import FooterImage from '@/assets/images/footer-img.png'
export default function Footer() {
  return (
    <footer className="mb-4 w-full" style={{
      backgroundImage: `url(${FooterImage.src})`,
      backgroundRepeat: 'repeat-x',
      backgroundSize: 'auto',
      filter: 'brightness(0.5) contrast(1)',
      minHeight: '8px'
    }}>
    </footer>
  )
}
