export function PizzaBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-5">
      {/* Pizza grande no canto */}
      <div className="absolute -bottom-40 -right-40 h-96 w-96">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="100" fill="#FFC107" />
          <circle cx="100" cy="100" r="90" stroke="#E65100" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="70" cy="60" r="8" fill="#E65100" />
          <circle cx="120" cy="50" r="6" fill="#E65100" />
          <circle cx="150" cy="80" r="7" fill="#E65100" />
          <circle cx="50" cy="100" r="9" fill="#E65100" />
          <circle cx="80" cy="140" r="8" fill="#E65100" />
          <circle cx="130" cy="130" r="7" fill="#E65100" />
          <circle cx="160" cy="110" r="6" fill="#E65100" />
          <path d="M30 100L170 100" stroke="#E65100" strokeWidth="2" strokeLinecap="round" />
          <path d="M100 30L100 170" stroke="#E65100" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>

      {/* Fatia de pizza */}
      <div className="absolute top-20 left-10 h-40 w-40">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 0L100 100H0L50 0Z" fill="#FFC107" />
          <path d="M50 10L90 90H10L50 10Z" stroke="#E65100" strokeWidth="1" />
          <circle cx="50" cy="30" r="5" fill="#E65100" />
          <circle cx="30" cy="60" r="4" fill="#E65100" />
          <circle cx="70" cy="50" r="3" fill="#E65100" />
          <circle cx="60" cy="70" r="4" fill="#E65100" />
        </svg>
      </div>

      {/* Ingredientes espalhados */}
      {/* Tomate */}
      <div className="absolute top-1/4 right-1/4 h-16 w-16">
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="25" cy="25" r="20" fill="#FF6B6B" />
          <path
            d="M25 5C14.5 5 5 14.5 5 25C5 35.5 14.5 45 25 45C35.5 45 45 35.5 45 25C45 14.5 35.5 5 25 5Z"
            stroke="#E53935"
            strokeWidth="1"
          />
          <path d="M15 25H35" stroke="#E53935" strokeWidth="1" strokeLinecap="round" />
          <path d="M25 15V35" stroke="#E53935" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>

      {/* Queijo */}
      <div className="absolute bottom-1/3 left-1/3 h-20 w-20">
        <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5 15L55 5L45 55L5 15Z"
            fill="#FFF59D"
            stroke="#FBC02D"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="25" r="2" fill="#FBC02D" />
          <circle cx="35" cy="20" r="2" fill="#FBC02D" />
          <circle cx="30" cy="35" r="2" fill="#FBC02D" />
        </svg>
      </div>

      {/* Azeitona */}
      <div className="absolute top-1/3 left-1/4 h-12 w-12">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="20" cy="20" rx="15" ry="10" fill="#33691E" />
          <ellipse cx="20" cy="20" rx="5" ry="3" fill="#827717" />
        </svg>
      </div>

      {/* Cogumelo */}
      <div className="absolute bottom-1/4 right-1/3 h-14 w-14">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 25H25V35H15V25Z" fill="#8D6E63" />
          <ellipse cx="20" cy="15" rx="15" ry="10" fill="#BCAAA4" />
          <circle cx="15" cy="10" r="2" fill="#8D6E63" />
          <circle cx="25" cy="12" r="2" fill="#8D6E63" />
          <circle cx="20" cy="8" r="2" fill="#8D6E63" />
        </svg>
      </div>

      {/* Pimentão */}
      <div className="absolute top-1/2 right-1/5 h-16 w-16">
        <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25 10C15 10 10 20 10 30C10 40 15 45 25 45C35 45 40 40 40 30C40 20 35 10 25 10Z" fill="#4CAF50" />
          <path d="M25 5V15" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  )
}
