import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
<<<<<<< Updated upstream
import db from 'db';
=======
>>>>>>> Stashed changes

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID || '',
      clientSecret: process.env.CLIENT_SECRET || '',
    }),
  ],
  pages: {
    signIn: '/login',
  },
<<<<<<< Updated upstream
  callbacks: {
    async signIn({ account, profile }) {
      const user = await db.user.findFirst({
        where: { email: { equals: profile.email } },
      });

      console.log({ user });

      if (!user) {
        const { name, email, image } = profile;

        if (name && email) {
          const createdUser = await db.user.create({
            data: {
              name,
              email,
              image: image || '',
            },
          });

          console.log({ createdUser });
        }
      }

      return true;
    },
  },
=======
>>>>>>> Stashed changes
});
