export function CuriLogo({
  size = "md",
}: {
  size?: "xs" | "sm" | "md" | "lg";
}) {
  return (
    <svg
      width={
        size == "lg" ? "103" : size == "md" ? "73" : size == "sm" ? "55" : "35"
      }
      height={"34"}
      viewBox="0 0 103 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.312 33.264C10.848 33.264 8.63333 32.8093 6.668 31.9C4.70267 30.9907 3.13333 29.656 1.96 27.896C0.816 26.1067 0.244 23.9507 0.244 21.428C0.244 19.668 0.552 17.7613 1.168 15.708C2.51733 11.308 4.556 8.14 7.284 6.204C10.012 4.23866 12.9307 3.256 16.04 3.256C17.712 3.256 19.1933 3.50533 20.484 4.004C21.7747 4.50267 22.9627 5.22133 24.048 6.16L25.236 5.236C26.028 4.62 26.688 4.19467 27.216 3.96C27.7733 3.72533 28.3893 3.608 29.064 3.608C29.7973 3.608 30.384 3.76933 30.824 4.092C31.264 4.41467 31.484 4.884 31.484 5.5C31.484 5.82267 31.4253 6.14533 31.308 6.468L28.844 13.332C28.58 14.124 28.2573 14.6813 27.876 15.004C27.524 15.3267 26.9813 15.488 26.248 15.488C25.4853 15.488 24.8547 15.224 24.356 14.696C23.8867 14.1387 23.344 13.2 22.728 11.88C22.024 10.5013 21.452 9.592 21.012 9.152C20.572 8.712 19.9267 8.492 19.076 8.492C17.8733 8.492 16.7147 9.24 15.6 10.736C14.4853 12.2027 13.4733 14.4173 12.564 17.38C11.8013 19.8733 11.42 21.956 11.42 23.628C11.42 25.0947 11.6987 26.1947 12.256 26.928C12.8133 27.632 13.5613 27.984 14.5 27.984C15.8787 27.984 17.008 27.676 17.888 27.06C18.7973 26.444 19.7213 25.608 20.66 24.552C21.2467 23.9067 21.716 23.4373 22.068 23.144C22.4493 22.8213 22.8453 22.66 23.256 22.66C23.784 22.66 24.3413 22.924 24.928 23.452C25.5147 23.98 25.7933 24.508 25.764 25.036C25.7933 25.6813 25.2653 26.6787 24.18 28.028C23.124 29.3773 21.6427 30.5947 19.736 31.68C17.8587 32.736 15.7173 33.264 13.312 33.264ZM54.6008 26.928C54.5422 27.1627 54.5128 27.3387 54.5128 27.456C54.5128 27.6613 54.5568 27.8227 54.6448 27.94C54.7622 28.0573 54.9088 28.116 55.0848 28.116C55.4368 28.116 55.7302 27.9693 55.9648 27.676C56.2288 27.3533 56.4048 27.192 56.4928 27.192C56.6395 27.192 56.7568 27.2947 56.8448 27.5C56.9622 27.676 57.0208 27.896 57.0208 28.16C57.0502 28.9813 56.7568 29.8027 56.1408 30.624C55.5248 31.416 54.6595 32.076 53.5448 32.604C52.4302 33.132 51.1835 33.396 49.8048 33.396C48.0742 33.396 46.6955 33.044 45.6688 32.34C44.6422 31.636 43.9822 30.712 43.6888 29.568C42.6328 30.7413 41.4595 31.636 40.1688 32.252C38.9075 32.8387 37.6168 33.132 36.2968 33.132C34.2435 33.132 32.5128 32.6333 31.1048 31.636C29.7262 30.6093 29.0368 29.1867 29.0368 27.368C29.0368 26.5467 29.1835 25.696 29.4768 24.816L32.2928 15.62C32.3808 15.356 32.4248 15.136 32.4248 14.96C32.4248 14.6373 32.3515 14.388 32.2048 14.212C32.0582 14.0067 31.8382 13.8013 31.5448 13.596C31.2515 13.3613 31.0462 13.156 30.9288 12.98C30.8115 12.804 30.7968 12.5693 30.8848 12.276C31.0608 11.6013 31.9848 11.0147 33.6568 10.516C35.3288 9.988 37.0742 9.724 38.8928 9.724C40.5942 9.724 41.8408 10.0467 42.6328 10.692C43.4248 11.3373 43.8208 12.2173 43.8208 13.332C43.8208 14.0067 43.7182 14.652 43.5128 15.268L40.7408 24.42C40.6235 24.7427 40.5648 25.0507 40.5648 25.344C40.5648 25.7547 40.6822 26.0627 40.9168 26.268C41.1515 26.4733 41.4595 26.576 41.8408 26.576C42.3982 26.576 42.8528 26.4147 43.2048 26.092C43.5568 25.7693 43.9088 25.2267 44.2608 24.464L46.9448 15.62C47.0328 15.356 47.0768 15.136 47.0768 14.96C47.0768 14.6373 47.0035 14.388 46.8568 14.212C46.7102 14.0067 46.5048 13.8013 46.2408 13.596C45.9475 13.3613 45.7422 13.156 45.6248 12.98C45.5075 12.804 45.4928 12.5693 45.5808 12.276C45.7275 11.6013 46.6368 11.0147 48.3088 10.516C49.9808 9.988 51.7262 9.724 53.5448 9.724C55.2462 9.724 56.4928 10.0467 57.2848 10.692C58.1062 11.3373 58.5168 12.2027 58.5168 13.288C58.5168 13.8453 58.3995 14.5053 58.1648 15.268L54.6008 26.928ZM80.2329 9.724C81.8756 9.724 83.1809 10.2227 84.1489 11.22C85.1462 12.2173 85.6449 13.4493 85.6449 14.916C85.6449 15.4733 85.5862 15.9867 85.4689 16.456C85.1756 17.6587 84.6182 18.5827 83.7969 19.228C82.9756 19.8733 81.9929 20.196 80.8489 20.196C79.7342 20.196 78.8836 19.932 78.2969 19.404C77.7396 18.876 77.2409 18.172 76.8009 17.292C76.5662 16.7933 76.3462 16.4267 76.1409 16.192C75.9356 15.9573 75.7009 15.84 75.4369 15.84C75.1436 15.84 74.8796 15.9573 74.6449 16.192C74.4396 16.4267 74.2489 16.8373 74.0729 17.424L70.6849 28.424C70.6262 28.5707 70.5969 28.7907 70.5969 29.084C70.5969 29.4653 70.6996 29.788 70.9049 30.052C71.1396 30.2867 71.4476 30.5213 71.8289 30.756C72.1809 30.9907 72.4156 31.1813 72.5329 31.328C72.6502 31.4747 72.6942 31.6653 72.6649 31.9C72.6062 32.2813 72.3862 32.56 72.0049 32.736C71.6529 32.912 71.0369 33 70.1569 33H58.8929C58.1302 33 57.5876 32.8827 57.2649 32.648C56.9129 32.384 56.7809 32.0467 56.8689 31.636C56.9862 31.284 57.2942 30.976 57.7929 30.712C58.2329 30.4773 58.5996 30.1987 58.8929 29.876C59.1862 29.5533 59.4356 29.04 59.6409 28.336L63.5569 15.62C63.6156 15.4733 63.6449 15.268 63.6449 15.004C63.6449 14.6813 63.5716 14.432 63.4249 14.256C63.3076 14.08 63.1022 13.86 62.8089 13.596C62.5156 13.3613 62.3102 13.156 62.1929 12.98C62.0756 12.804 62.0609 12.5693 62.1489 12.276C62.3249 11.6013 63.2489 11.0147 64.9209 10.516C66.5929 9.988 68.3382 9.724 70.1569 9.724C71.3596 9.724 72.3569 10.0027 73.1489 10.56C73.9409 11.088 74.4542 11.8507 74.6889 12.848C76.0969 10.7653 77.9449 9.724 80.2329 9.724ZM95.6814 9.724C97.3827 9.724 98.6294 10.0467 99.4214 10.692C100.213 11.3373 100.609 12.2173 100.609 13.332C100.609 14.0067 100.507 14.652 100.301 15.268L96.2534 28.424C96.1654 28.776 96.1214 29.084 96.1214 29.348C96.1214 29.7293 96.1947 30.0373 96.3414 30.272C96.488 30.4773 96.6934 30.6827 96.9574 30.888C97.1627 31.0933 97.3094 31.2693 97.3974 31.416C97.4854 31.5333 97.5 31.6947 97.4414 31.9C97.2947 32.2813 97.0014 32.56 96.5614 32.736C96.1214 32.912 95.4467 33 94.5374 33H84.5054C83.7427 33 83.1854 32.8827 82.8334 32.648C82.4814 32.384 82.364 32.0467 82.4814 31.636C82.5987 31.284 82.9067 30.976 83.4054 30.712C83.8454 30.4773 84.212 30.1987 84.5054 29.876C84.7987 29.5533 85.048 29.04 85.2534 28.336L89.0814 15.62C89.1694 15.356 89.2134 15.136 89.2134 14.96C89.2134 14.6373 89.14 14.388 88.9934 14.212C88.8467 14.0067 88.6267 13.8013 88.3334 13.596C88.04 13.3613 87.8347 13.156 87.7174 12.98C87.6 12.804 87.5854 12.5693 87.6734 12.276C87.8494 11.6013 88.7734 11.0147 90.4454 10.516C92.1174 9.988 93.8627 9.724 95.6814 9.724ZM98.6294 -2.6226e-06C99.7734 -2.6226e-06 100.727 0.381331 101.489 1.144C102.252 1.87733 102.633 2.78666 102.633 3.872C102.633 4.63466 102.428 5.38267 102.017 6.116C101.636 6.84933 101.079 7.45067 100.345 7.92C99.6414 8.36 98.8494 8.58 97.9694 8.58C96.8547 8.58 95.916 8.21333 95.1534 7.48C94.42 6.71733 94.0387 5.77867 94.0094 4.664C94.0094 3.93067 94.2 3.212 94.5814 2.508C94.9627 1.77466 95.5054 1.17333 96.2094 0.703999C96.9134 0.234665 97.72 -2.6226e-06 98.6294 -2.6226e-06Z"
        fill="#8B5CF6"
      />
    </svg>
  );
}
