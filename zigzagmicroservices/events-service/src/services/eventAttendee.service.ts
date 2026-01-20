// src/services/eventAttendee.service.ts
import { Event, EventAttendee } from "../models/associations";
import dotenv from "dotenv";

dotenv.config();

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;

/**
 * Fetches user data from user-service API
 * Uses native fetch (Node.js 18+)
 */
async function fetchUserData(userId: string, internalKey: string): Promise<any | null> {
  try {
    const response = await fetch(`${USER_SERVICE_URL}/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(internalKey && { "x-internal-key": internalKey }), // Only include if provided
      },
    });

    if (!response.ok) {
      // User might not exist, that's okay - return null instead of throwing
      if (response.status === 404) {
        return null;
      }
      console.error(`Failed to fetch user ${userId}: ${response.status}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching user data for ${userId}:`, error);
    return null;
  }
}

/**
 * Fetches user bio data from user-service API
 */
async function fetchUserBio(userId: string, internalKey: string): Promise<any | null> {
  try {
    const response = await fetch(`${USER_SERVICE_URL}/${userId}/bio`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(internalKey && { "x-internal-key": internalKey }),
      },
    });

    if (!response.ok) {
      // Bio might not exist, that's okay
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching user bio for ${userId}:`, error);
    return null;
  }
}

// GET /events/:userId/getUserEventAttendance/me
export const getUserEventAttendance = async (
  userId: string,
  internalKey?: string
): Promise<any[]> => {
  const rows = await EventAttendee.findAll({
    where: { userId },
    include: [
      {
        model: Event,
        as: "event",
        attributes: [
          "id",
          "title",
          "tagline",
          "description",
          "date",
          "address1",
          "address2",
          "city",
          "state",
          "postalCode",
          "country",
          "latitude",
          "longitude",
        ],
      },
    ],
    order: [[{ model: Event, as: "event" }, "date", "ASC"]],
  });

  // If internalKey is provided, fetch user data from user-service
  if (internalKey && rows.length > 0) {
    // Fetch user data once (all events are for the same user)
    const userData = await fetchUserData(userId, internalKey);
    const userBio = await fetchUserBio(userId, internalKey);

    // Combine event attendance data with user data
    return rows.map((row) => {
      const rowData = row.toJSON() as any;
      return {
        ...rowData,
        user: userData
          ? {
              id: userData.id,
              name: userData.name,
              username: userData.username,
              email: userData.email,
              accountType: userData.accountType,
              bio: userBio
                ? {
                    birthday: userBio.showBirthday ? userBio.birthday : null,
                    pronouns: userBio.showPronouns ? userBio.pronouns : null,
                    userVibe: userBio.userVibe,
                    othersVibe: userBio.othersVibe,
                    eventInterests: userBio.eventInterests,
                    availability: userBio.availability,
                    purpose: userBio.purpose,
                    bio: userBio.bio,
                    profilePicture: userBio.profilePicture,
                  }
                : null,
            }
          : null,
      };
    });
  }

  // Return without user data if no internalKey
  return rows.map((row) => row.toJSON());
};





