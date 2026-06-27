"use client";

import styles from "./reviews-carousel.module.css";

type ReviewItem = {
  name: string;
  location: string;
  photo: string;
  text: string;
};

function Star() {
  return (
    <svg width="18.75" height="17.5" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M9.37505 0C9.6458 0 9.88576 0.174329 9.96944 0.431821L11.8604 6.25H18.125C18.399 6.25 18.6409 6.42835 18.722 6.68998C18.8031 6.95161 18.7044 7.23555 18.4785 7.39046L13.3997 10.8731L15.3579 16.6751C15.4448 16.9328 15.3552 17.2171 15.1362 17.3783C14.9172 17.5395 14.6191 17.5407 14.3989 17.3811L9.37505 13.7406L4.35116 17.3811C4.13096 17.5407 3.83287 17.5395 3.61388 17.3783C3.3949 17.2171 3.30528 16.9328 3.39224 16.6751L5.35043 10.8731L0.271591 7.39046C0.0456921 7.23555 -0.053025 6.95161 0.0280607 6.68998C0.109146 6.42835 0.351139 6.25 0.625047 6.25H6.88974L8.78065 0.431821C8.86433 0.174329 9.1043 0 9.37505 0ZM9.37505 2.64709L7.93819 7.06818C7.85451 7.32567 7.61455 7.5 7.3438 7.5H2.64167L6.44725 10.1095C6.67791 10.2677 6.77541 10.5599 6.68598 10.8249L5.20244 15.2205L9.00831 12.4627C9.2271 12.3041 9.52299 12.3041 9.74178 12.4627L13.5477 15.2205L12.0641 10.8249C11.9747 10.5599 11.6443 10.1582 11.875 10L11.4583 9.16667L11.0417 7.91667C10.7709 7.91667 10.8956 7.32567 10.8119 7.06818L9.37505 2.64709Z" fill="#F6AD55"/>
      <path d="M9.26143 0.655213L10.9281 6.28021L14.2614 15.8635L9.26143 12.999L3.87081 16.9052L5.98018 10.6552L0.511432 6.90521H7.23018L9.26143 0.655213Z" fill="#F6AD55"/>
    </svg>
  );
}

function GoogleG() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M33.5 18.37c0-1.12-.1-2.2-.28-3.24H18v6.12h8.7a7.44 7.44 0 01-3.23 4.88v4.06h5.23c3.06-2.82 4.82-6.97 4.82-11.82z" fill="#4285F4" />
      <path d="M18 34c4.37 0 8.04-1.45 10.72-3.93l-5.23-4.06c-1.45.97-3.3 1.54-5.49 1.54-4.22 0-7.8-2.85-9.08-6.69H3.53v4.19A16.19 16.19 0 0018 34z" fill="#34A853" />
      <path d="M8.92 20.86A9.72 9.72 0 018.42 18c0-.99.17-1.95.5-2.86V10.95H3.53A16.19 16.19 0 002 18c0 2.62.63 5.1 1.53 7.05l5.39-4.19z" fill="#FBBC05" />
      <path d="M18 8.45c2.38 0 4.51.82 6.19 2.42l4.64-4.64C26.03 3.64 22.36 2 18 2A16.19 16.19 0 003.53 10.95l5.39 4.19C10.2 11.3 13.78 8.45 18 8.45z" fill="#EA4335" />
    </svg>
  );
}

function ReviewCard({ r }: { r: ReviewItem }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.reviewer}>
          <div
            className={styles.avatar}
            style={{ backgroundImage: `url(${r.photo})` }}
          />
          <div>
            <p className={styles.name}>{r.name}</p>
            <p className={styles.location}>{r.location}</p>
          </div>
        </div>
        <GoogleG />
      </div>
      <div className={styles.stars}>
        {Array.from({ length: 5 }).map((_, i) => <Star key={i} />)}
      </div>
      <p className={styles.reviewText}>{r.text}</p>
    </div>
  );
}

export default function ReviewsCarousel({ reviews }: { reviews: ReviewItem[] }) {
  return (
    <div className={styles.viewport}>
      <div className={styles.fadeLeft} />
      <div className={styles.fadeRight} />
      <div className={styles.track}>
        <div className={styles.row}>
          {reviews.map((r, i) => <ReviewCard key={`first-${i}`} r={r} />)}
        </div>
        <div className={styles.row}>
          {reviews.map((r, i) => <ReviewCard key={`second-${i}`} r={r} />)}
        </div>
      </div>
    </div>
  );
}
