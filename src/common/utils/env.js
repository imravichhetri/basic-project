const Env = {
	isClient: () => process.env.RUN_ENV === "client",
	isMobile: () => process.env.RUN_ENV === "client" && window.screen.width < 800
};

export default Env;
