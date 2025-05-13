import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Ícones do LinkedIn e GitHub

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto w-full">
      <div className="flex flex-col items-center">
        <p className="mb-2">Desenvolvido por João Vitor Cangussu</p>
        <div className="flex gap-4">
          <a
            href="https://www.linkedin.com/in/jvcangussu/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://github.com/jvcangussu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-gray-500"
          >
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;