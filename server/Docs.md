# Server For Promptpalace

### Files and their op

#### controllers/auth.controller.ts
- Used for main Auth Route Logic
- Email based login and signup (magic link)
- user flow

```
/auth ----> user login (/api/login) ----> if acc deactivated (i.e. cookie is not recieved or is expired) (15 day ttl per session) ----> send verify link ----> verfied? set cookie and login

/auth ----> user signup (/api/register) ----> save in db as unverified (ttl 1 day) ----> route to /login

first login ----> saves user forever in db, if signed up but no login in first day ----> signup again

```
- File contains 3 controllers ( register, login, verify )
