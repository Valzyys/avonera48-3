import Link from "next/link";
import { pick, tanggal } from "@/lib/format";
import { Shot } from "@/components/Shot";

export function MemberCard({ member }: { member: any }) {
  const name = pick<string>(member, "name", "nickname", "member.name") ?? "Member";
  const img = pick<string>(member, "img_alt", "img", "image", "photo", "avatar");
  const slug =
    pick<string>(member, "slug", "url_key", "member_id", "id") ?? name;
  const gen = pick<string>(member, "generation", "group");

  return (
    <Link href={`/members/${encodeURIComponent(slug)}`} className="card">
      <Shot src={img} alt={name}>
        <div className="shot-cap">
          <p className="n">{name}</p>
          {gen ? <p className="g">{gen}</p> : null}
        </div>
      </Shot>
    </Link>
  );
}

export function LiveCard({ item }: { item: any }) {
  const name =
    pick<string>(item, "name", "member.name", "room.name", "title") ?? "Live";
  const img = pick<string>(item, "img_alt", "img", "image", "member.img", "thumbnail");
  const type = (pick<string>(item, "type", "platform") ?? "").toUpperCase();
  const viewers = pick<number>(item, "viewers", "views", "total_view");
  const url = pick<string>(item, "url", "stream_url", "link");

  const inner = (
    <Shot src={img} alt={name}>
      <span className="live-dot">LIVE</span>
      {type ? <span className="plat">{type}</span> : null}
      <div className="shot-cap">
        <p className="n">{name}</p>
        <p className="g">{viewers ? `${viewers} nonton` : "sedang siaran"}</p>
      </div>
    </Shot>
  );

  return url ? (
    <a className="card" href={url} target="_blank" rel="noreferrer">
      {inner}
    </a>
  ) : (
    <div className="card">{inner}</div>
  );
}

export function NewsCard({ item }: { item: any }) {
  const title = pick<string>(item, "title", "judul") ?? "Tanpa judul";
  const slug = pick<string>(item, "slug", "id", "url") ?? "";
  const date = pick<string>(item, "date", "published_at", "created_at");
  const label = pick<string>(item, "label", "category");

  return (
    <Link href={`/news/${encodeURIComponent(slug)}`} className="card">
      <div className="card-body">
        <p className="meta">
          {tanggal(date)}
          {label ? ` · ${label}` : ""}
        </p>
        <p className="card-title card-title-clamp" style={{ marginTop: 7 }}>
          {title}
        </p>
      </div>
    </Link>
  );
}

export function Empty({ children }: { children: React.ReactNode }) {
  return <div className="notice">{children}</div>;
}
