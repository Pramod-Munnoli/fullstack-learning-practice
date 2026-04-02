function Footer() {
    return (
        <footer className="mt-auto border-t border-gray-100 bg-white py-10 px-4 md:px-12">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <span className="font-bold text-gray-900">Wanderlust</span>
                    <span>&copy; {new Date().getFullYear()}. Exploration redefined.</span>
                </div>
                <div className="flex items-center gap-6">
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors"><i className="fa-brands fa-facebook-f text-lg"></i></a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors"><i className="fa-brands fa-twitter text-lg"></i></a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors"><i className="fa-brands fa-instagram text-lg"></i></a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
