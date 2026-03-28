const logos = ["Figma","Adobe","Shopify","Webflow","Notion","Slack","Framer","WordPress","HubSpot","Stripe",
               "Figma","Adobe","Shopify","Webflow","Notion","Slack","Framer","WordPress","HubSpot","Stripe"];
export default function ClientLogos() {
  return (
    <section className="bg-[#F5F5F5] py-10 overflow-hidden border-y border-gray-200">
      <p className="text-center text-xs tracking-widest uppercase text-gray-400 mb-6">Trusted by leading brands worldwide</p>
      <div className="relative flex overflow-x-hidden">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {logos.map((logo,i) => (
            <span key={i} className="text-gray-400 font-display font-bold text-lg tracking-tight hover:text-gray-700 transition-colors cursor-default">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
