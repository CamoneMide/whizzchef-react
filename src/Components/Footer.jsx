const Footer = () => {
  return (
    <>
      <div className="text-[var(--text-heading)] px-[30px] bg-[var(--area-bg-color)]">
        <div className="flex flex-col items-center md:justify-between md:flex-row text-[12px] md:text-[14px] font-[400] border-t-[1px] border-t-[var(--area-bg-color)] py-[10px]">
          <p>Copyright &copy; 2025, WhizzChef-React.</p>
          <p className="flex flex-row items-center flex-nowrap">
            <strong>Developed by</strong>
            <a
              href="https://github.com/CamoneMide"
              target="_blank"
              className="ml-1"
            >
              <i>Camone_Mide</i>
            </a>
            <a
              rel="noreferrer"
              href="https://www.linkedin.com/in/mide-web-developer"
              target="_blank"
              className="text-[20px] text-[#0A66C2] px-[2px]"
            >
              <i className="bx bxl-linkedin"></i>
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
