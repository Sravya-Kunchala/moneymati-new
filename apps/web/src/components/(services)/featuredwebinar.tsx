import Image from "next/image";
import { Inter, Playfair_Display } from "next/font/google";
import { ChevronLeft, ChevronRight } from "lucide-react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: "700" });

export default function FeaturedWebinar() {
  return (
    <section className="w-full bg-[#f5f0e8] py-12 px-8 relative overflow-hidden">

      {/* Top diagonal line */}
      <svg width="965" height="306" viewBox="0 0 965 306" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: 0, right: 0, zIndex: 0, pointerEvents: "none" }}>
        <path d="M0 305.5C15.4354 299.924 31.8263 293.98 47.2054 288.444C190.536 236.862 333.766 186.541 477.968 138.103C622.177 90.5243 766.394 40.9642 914.866 7.55337C930.335 4.39589 948.679 1.0486 964.5 0C948.674 0.982021 930.312 4.26774 914.829 7.36718C766.199 40.2597 621.867 89.5736 477.65 137.155C333.437 185.597 190.289 236.175 47.1406 288.266C31.7818 293.858 15.4126 299.861 0 305.5Z" fill="#677E73"/>
      </svg>

      {/* Bottom diagonal line — pulled up closer to top line */}
      <svg width="965" height="306" viewBox="0 0 965 306" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", top: "30px", right: 0, zIndex: 0, pointerEvents: "none" }}>
        <path d="M0 305.5C15.4354 299.924 31.8263 293.98 47.2054 288.444C190.536 236.862 333.766 186.541 477.968 138.103C622.177 90.5243 766.394 40.9642 914.866 7.55337C930.335 4.39589 948.679 1.0486 964.5 0C948.674 0.982021 930.312 4.26774 914.829 7.36718C766.199 40.2597 621.867 89.5736 477.65 137.155C333.437 185.597 190.289 236.175 47.1406 288.266C31.7818 293.858 15.4126 299.861 0 305.5Z" fill="#677E73"/>
      </svg>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2
              className={`${playfair.variable}`}
              style={{ fontWeight: 700, fontSize: "30px", lineHeight: "36px", letterSpacing: "0px", color: "#004D40" }}
            >
              Featured Webinar
            </h2>
            <p
              className={`${inter.className} mt-1`}
              style={{ fontWeight: 400, fontSize: "16px", lineHeight: "24px", letterSpacing: "0px", color: "#475569" }}
            >
              Our most requested session of the month.
            </p>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            </button>
            <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100">
              <ChevronRight className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl overflow-hidden flex shadow-sm min-h-[400px]">

          {/* Left — Image */}
          <div className="relative w-[500px] flex-shrink-0">
            <Image src="/webinar-featured.svg" alt="Featured Webinar" fill className="object-cover" />
          </div>

          {/* Right — Content */}
          <div className="p-10 flex flex-col gap-4 justify-center">

            {/* Date */}
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="#10B981" strokeWidth="2"/>
                <line x1="3" y1="9" x2="21" y2="9" stroke="#10B981" strokeWidth="2"/>
                <line x1="8" y1="2" x2="8" y2="6" stroke="#10B981" strokeWidth="2"/>
                <line x1="16" y1="2" x2="16" y2="6" stroke="#10B981" strokeWidth="2"/>
              </svg>
              <span className={`${inter.className} text-[#10B981] text-xs font-semibold tracking-widest uppercase`}>
                March 26, 2026 • 6:00 PM IST
              </span>
            </div>

            {/* Title */}
            <h3
              className={`${inter.className}`}
              style={{ fontWeight: 700, fontSize: "36px", lineHeight: "45px", letterSpacing: "0px", color: "#004D40" }}
            >
              Investing for the Future: A Woman's Guide to Wealth
            </h3>

            {/* Description */}
            <p
              className={`${inter.className} max-w-lg`}
              style={{ fontWeight: 400, fontSize: "18px", lineHeight: "29.25px", letterSpacing: "0px", color: "#475569" }}
            >
              Learn how to build a diversified portfolio that aligns with
              your life values. This session covers tax-efficient
              investing and long-term asset allocation specifically for
              women.
            </p>

            {/* Button + Avatars */}
            <div className="flex items-center gap-4 mt-2">
              <button
                className={`${inter.className} font-bold text-[#004D40]`}
                style={{ backgroundColor: "#FFB600", borderRadius: "9999px", padding: "10px 24px", fontSize: "14px", whiteSpace: "nowrap" }}
              >
                Register Now
              </button>

              {/* Avatars — unchanged */}
              <div className="flex items-center -space-x-2">

                {/* Avatar 1 */}
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <rect x="1" y="1" width="38" height="38" rx="19" fill="url(#pattern0_25_600)"/>
                  <rect x="1" y="1" width="38" height="38" rx="19" stroke="white" strokeWidth="2"/>
                  <defs>
                    <pattern id="pattern0_25_600" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlinkHref="#image0_25_600" transform="scale(0.0125)"/>
                    </pattern>
                    <image id="image0_25_600" width="80" height="80" preserveAspectRatio="none" xlinkHref="data:image/jpeg;base64,/9j/2wBDAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNH/2wBDAQgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNH/wgARCABQAFADASIAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAAAAIBAwQGBwUI/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/9oADAMBAAIQAxAAAADt0hIDIxjmdVYdQCZ3gBA0OyeS9d+fL5cGiDbzt565wH6Bx9GpXSOqbK7AfW9ldz87R3/C04/O2WyvPsrR0VQ9bh4WGl9881Uea42C7zcxXsaysdESCbCjUxIBMQAAj//EADAQAAICAgECAwUHBQAAAAAAAAECAwQABRESEwYgMRAhMkFRFRYiI2FicTRCkZKh/9oACAEBAAE/APJxnHmGAZNLFBFJNM4SNFLMzegAzaeM55JmTX3IYYh6MYWctmt8ZbKGdE2Bgmgb+9eFP8gjI5I5o0lidXRhyrKeQRhHkAwDPFPiCS/cm10LkVI36GCfFO65I9f3qtcD9wkZsUckDkD9TnhPxBYoWotba/pnfoXn1idsIwj2DBi+oyavLWl3CyDiWJ+2fqOuTgn2w15LL6dYwTNLIYh9SEcAHG9Thw4MGDN14Zr7GU2YiI53j7coPwTJ+vHow+Rzb6izqbbV5wf2MRwGGanVWNrbSvAD+4gc9I+pzS+GYNdMtmUh5kj7cQHwxJ+n1Y/M4cOHBgwYM2NZbVG1CYI5WaJwiSccdRHA9fTNBQk1+pq1pYYkmReJO37wxB+LnDhw+wYM2e9ehtNfTEKskxXuuSeYw79C5NvdzXTdPLVpca4J19Lycs0npk/iK3TfVizHUdLUzI0kDswRQB/3k4nimY/YfVWjAtqWn/Efy17vaBXLG/uQbKzCasDVYb0FVmDsJeZx7iM0+1ubF5WdKaxJJKnSjsZeY26QSD8jh9oObbQXdhau2EtCMmKBYE+RMTdf48v6mzJB4kBlhX7Q7PbLEgKUAB6sl1ZuJWScUIIoksxla7Hj85AFYe4e/kZ93nkpxJLdq96GikdZg/pKkpct/GNqb1u9YlE1U1Z71a07qxZwYAPwgZpNbd10k6ywU+h5JX7yE909b9QU8j0GHyA4wVhwygj6HO3Fxx21/wADO1D7vyk/1GKqIOEUKPoBxhPn583/xAAcEQABBAMBAAAAAAAAAAAAAAABAAIQERIgISL/2gAIAQIBAT8AjA6MAh4kGlnxE3IpeUarf//EACURAAMAAAQEBwAAAAAAAAAAAAECEQADEBIEFCAxEyEiI0GRof/aAAgBAwEBPwDTmcrdP3o4pmCqB2NunCsxVgewk1ZVYQjHK+5L6cKqqIBq3i1pfmfWC2bTD5YU5m8W7aeiDX//2Q=="/>
                  </defs>
                </svg>

                {/* Avatar 2 */}
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <rect x="1" y="1" width="38" height="38" rx="19" fill="url(#pattern0_25_602)"/>
                  <rect x="1" y="1" width="38" height="38" rx="19" stroke="white" strokeWidth="2"/>
                  <defs>
                    <pattern id="pattern0_25_602" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlinkHref="#image0_25_602" transform="scale(0.0125)"/>
                    </pattern>
                    <image id="image0_25_602" width="80" height="80" preserveAspectRatio="none" xlinkHref="data:image/jpeg;base64,/9j/2wBDAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNH/2wBDAQgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNH/wgARCABQAFADASIAAhEBAxEB/8QAGwABAQACAwEAAAAAAAAAAAAAAAEFBgMEBwL/xAAXAQEBAQEAAAAAAAAAAAAAAAAAAwIB/9oADAMBAAIQAxAAAAD3GwVIfTr3jnHQEA0ndvOJ65XF25b2XL4rK3nZZrgE859H1yetbzm0chC0ylgspKAEWFlhcXlBhmZGL48wMX95EdLuh//EAC4QAAIBAgQFAgQHAAAAAAAAAAECAwQRAAUhMRITIFFxEGEUMEFSFSIjNEDB0v/aAAgBAQABPwD5ruiKWdgqjck2GBV0xjMgnTgBsWvpfEVVTzG0cyMewPyMzrGqalxf9NCQg8fXCvePlGwBcMD2Nra4kjlhcBgVbcH+wRjKK5qmNo5DeRPr3HUdj49UkMsK0xQs3GOUexO48HFBliUjhy5aUqQft6jsfB9cmopWqFqHUhE1FxucadR2PjFBko4VkqvIj/1hIYYxZI0UewA9APkH+DJmLpUyRfDOUDoivsGJIDan7b4jzhHH7WbiCoSBYj8y8R19sDOEMpU08pUvwqQLnQXN/f23xT5rFO0SiGVTJGzi9tlBPf2x+LqwXlU8p0DNcbLa58nD5mE5Tmnk5bxKwIF2uxOlvAxNmUcLKrQTXMYk0XQA922xTVoqJXQQyIAoYFha4PXc9P8A/8QAHBEBAAEEAwAAAAAAAAAAAAAAARECAxAhACAw/9oACAECAQE/AMSdLjoMUzG81ipHC3DK+v8A/8QAGhEAAgIDAAAAAAAAAAAAAAAAAQIQEQAgMP/aAAgBAwEBPwDZYNXKnC3X/9k="/>
                  </defs>
                </svg>

                {/* Avatar 3 */}
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                  <rect x="1" y="1" width="38" height="38" rx="19" fill="url(#pattern0_25_603)"/>
                  <rect x="1" y="1" width="38" height="38" rx="19" stroke="white" strokeWidth="2"/>
                  <defs>
                    <pattern id="pattern0_25_603" patternContentUnits="objectBoundingBox" width="1" height="1">
                      <use xlinkHref="#image0_25_603" transform="scale(0.0125)"/>
                    </pattern>
                    <image id="image0_25_603" width="80" height="80" preserveAspectRatio="none" xlinkHref="data:image/jpeg;base64,/9j/2wBDAAgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNH/2wBDAQgICAgJCAkKCgkNDgwODRMREBARExwUFhQWFBwrGx8bGx8bKyYuJSMlLiZENS8vNUROQj5CTl9VVV93cXecnNH/wgARCABQAFADASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAEDBAIF/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAEDAv/aAAwDAQACEAMQAAAA8QZ7C8r5smWlZXYAA05tkuea5q2nZjiB1Ahqy6pc1ndkVUW1UFjviwmaZl9NVzn3mcNeOuLahIkEnasswImB/8QALRAAAgECAwYGAgMBAAAAAAAAAQIDABESITEEECAiQVETMmFxgdEwwSNCcpH/2gAIAQEAAT8A4BFI2iMfiiCDYgg/gW0aK9gXby36DvQWWUlsz3JNB2U4ZFJHY/qnTA1gbjUHuDxzLedlGQWw9gBTuWy/qPKO1JdgUPbl9DT5wQN/pf8Ahv8AvjnUGMSg5SMCR8fe4eZba3FbWmDwwGuOY/JPGjhoPBJAuxPz0o3BIIsRUQzxkcqZn36Cp5TI973AAA++PZ4wZIjIOUuoF+t6mkJlkxKDZzrkdaidWi2gOvKFBAHQ3p4mS/UdxwqoNyTZRXiW8igeuppLMHxvbMG+pqdF2mOSZVIkRULWzDg5YvQ96l2YQxCFiVYjGx72HbsKdv5HZT1NiKx38yg+uhp1w2IN1Oh3tkqL8n3O+DaWhk2aVWtbkb2vUsxlm2qUm9wbe17DemasnyPcb9d8ZzwnRsvo03IuDrq31+I8P//EABwRAAIBBQEAAAAAAAAAAAAAAAERAAIQICExQv/aAAgBAgEBPwDI9Fqdi9SUJK5Alq6iqa8iLP8A/8QAHBEAAQQDAQAAAAAAAAAAAAAAAQAQETEgMEGB/9oACAEDAQE/AMhRY24XUXlSPdH/2Q=="/>
                  </defs>
                </svg>

                {/* Avatar 4 — 120+ badge */}
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="38" height="38" rx="19" fill="#E2E8F0"/>
                  <rect x="1" y="1" width="38" height="38" rx="19" stroke="white" strokeWidth="2"/>
                  <path d="M10.7041 21.9052V16.8931H11.9433V21.9052H10.7041ZM8.82136 19.9853V18.8107H13.826V19.9853H8.82136ZM18.3722 15.7246V23H16.8869V17.0375H16.8381L15.1699 18.2173V16.852L16.7783 15.7246H18.3722ZM19.6328 23V21.9276L22.2106 19.5086C22.4316 19.293 22.6184 19.0986 22.7711 18.9256C22.9237 18.7526 23.0399 18.5823 23.1196 18.4146C23.1994 18.2469 23.2392 18.0649 23.2392 17.8684C23.2392 17.6514 23.19 17.4646 23.0915 17.3081C22.9931 17.1515 22.8593 17.0311 22.6903 16.9468C22.5212 16.8624 22.3276 16.8202 22.1094 16.8202C21.8836 16.8202 21.6866 16.8658 21.5184 16.9571C21.3501 17.0483 21.2198 17.1785 21.1276 17.3476C21.0354 17.5168 20.9893 17.7196 20.9893 17.9562H19.5679C19.5679 17.4825 19.6756 17.0715 19.8908 16.7231C20.1061 16.3748 20.4057 16.105 20.7897 15.9138C21.1737 15.7226 21.6173 15.627 22.1206 15.627C22.6344 15.627 23.0832 15.7186 23.4669 15.9019C23.8507 16.0852 24.1492 16.3382 24.3625 16.6609C24.5758 16.9836 24.6824 17.3547 24.6824 17.7742C24.6824 18.0467 24.6295 18.3145 24.5237 18.5775C24.4179 18.8406 24.2294 19.1353 23.9584 19.4616C23.6874 19.7879 23.3027 20.1798 22.8045 20.6373L21.7032 21.7225V21.7758H24.7808V23H19.6328ZM28.6975 23.0977C28.0853 23.0977 27.5624 22.9503 27.1288 22.6556C26.6952 22.3608 26.363 21.936 26.1322 21.381C25.9013 20.8259 25.7859 20.1543 25.7859 19.3659C25.7859 18.5807 25.9017 17.9096 26.1332 17.3524C26.3647 16.7951 26.6972 16.3683 27.1306 16.0717C27.564 15.7752 28.0863 15.627 28.6975 15.627C29.3087 15.627 29.8319 15.7755 30.2671 16.0726C30.7023 16.3697 31.0349 16.7966 31.2649 17.3532C31.4948 17.9099 31.6098 18.5813 31.6098 19.3675C31.6098 20.1537 31.4952 20.8246 31.266 21.3802C31.0368 21.9357 30.7054 22.3608 30.2718 22.6556C29.8382 22.9503 29.3134 23.0977 28.6975 23.0977ZM28.6981 21.8599C28.9965 21.8599 29.2492 21.7628 29.4561 21.5686C29.6631 21.3744 29.8207 21.0917 29.9289 20.7204C30.0372 20.3491 30.0913 19.8979 30.0913 19.3669C30.0913 18.833 30.0372 18.3792 29.9289 18.0055C29.8207 17.6319 29.6629 17.3471 29.4556 17.1511C29.2483 16.9551 28.996 16.8572 28.6986 16.8572C28.4013 16.8572 28.1487 16.9555 27.9409 17.1522C27.733 17.3489 27.575 17.6337 27.4668 18.0067C27.3585 18.3796 27.3044 18.833 27.3044 19.3669C27.3044 19.8979 27.3581 20.3491 27.4654 20.7204C27.5728 21.0917 27.7305 21.3744 27.9385 21.5686C28.1466 21.7628 28.3998 21.8599 28.6981 21.8599Z" fill="#0F172A"/>
                </svg>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}