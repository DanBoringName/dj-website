const DevLogs = () => {
  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <p className="sm:text-2xl text-l font-medium text-white font-sans p-3">
        Dev Logs<span>📝</span>
      </p>
      <div className="grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3 ">
          <div className="grid-container">
            <div>
              <p className="grid-headtext">2025 - Changes</p>
              <p className="grid-subtext p-2">
                The Discord bot has been created. Linked to discord. Linked to google gemini and chatgpt via an api key.
                A user can now give the /gemini command in the discord guild to query gemini or gpt based on a
                selection, followed by their query. The AI will respond in a clear and concise manor. NOTE: The name of
                the command is currently "gemini" which is misleading and will be correctly once a better more general
                command word is decided.
              </p>
              <p className="grid-subtext p-2">
                A few friends who have wanted to learn a bit about coding have joined as collaborators on the project.
              </p>
              <video autoPlay loop muted className=" w-full sm:h-[266px] h-fit">
                <source src="/assets/bot_demo_june.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevLogs;
