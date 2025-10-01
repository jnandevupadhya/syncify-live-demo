import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  disabled: boolean;
}

interface JoinRequest {
  id: string;
  name: string;
}

export const Step4 = () => {
  const [confettiPieces, setConfettiPieces] = useState<
    Array<{ id: number; left: number; delay: number; emoji: string }>
  >([]);
  const [showDiv, setShowDiv] = useState(true);
  const [showQueues, setShowQueues] = useState(false);
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "User 1", disabled: false },
    { id: "2", name: "User 2", disabled: false },
  ]);
  const [requests, setRequests] = useState<JoinRequest[]>([
    { id: "r1", name: "Join Request 1" },
  ]);

  useEffect(() => {
    setShowDiv(true);
    // Generate confetti pieces
    const pieces = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      emoji: ["🎉", "🎊", "✨", "🌟", "💫"][Math.floor(Math.random() * 5)],
    }));
    setConfettiPieces(pieces);

    setTimeout(() => {
      setShowDiv(false);
    }, 3000);

    setTimeout(() => {
      setShowQueues(true);
    }, 2000);
  }, []);

  const removeUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const toggleDisable = (id: string) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, disabled: !user.disabled } : user
      )
    );
  };

  const acceptRequest = (id: string) => {
    const request = requests.find((req) => req.id === id);
    if (request) {
      setRequests(requests.filter((req) => req.id !== id));
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: request.name,
        disabled: false,
      };
      setUsers([...users, newUser]);
    }
  };

  const rejectRequest = (id: string) => {
    setRequests(requests.filter((req) => req.id !== id));
  };

  const addRequest = () => {
    const newRequest: JoinRequest = {
      id: `req-${Date.now()}`,
      name: `Join Request ${requests.length + 1}`,
    };
    setRequests([...requests, newRequest]);
  };

  return (
    <div className="step-card text-center max-w-lg mx-auto slide-up-enter relative overflow-hidden">
      {/* Confetti Animation */}
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute text-2xl confetti pointer-events-none"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            top: "-20px",
          }}
        >
          {piece.emoji}
        </div>
      ))}

      <div className="relative z-10">
        <div
          className={`flex flex-col justify-center transition-all duration-500 ease-in-out overflow-hidden ${
            showDiv ? "opacity-100 max-h-[500px] mb-8" : "opacity-0 max-h-0 mb-0"
          }`}
        >
          <div className="text-8xl mb-6 animate-bounce">🎉</div>

          <h2 className="text-4xl font-bold mb-4 text-success">ALL DONE!</h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Your Spotify listen-along extension is ready to rock!
          </p>
        </div>

        <div
          className={`bg-success/20 border border-success/30 rounded-2xl p-6 transition-all duration-500 ease-in-out overflow-hidden ${
            !showDiv ? "opacity-100 max-h-[500px] mb-8" : "opacity-0 max-h-0 mb-0"
          }`}
        >
          <h3 className="text-xl font-semibold mb-3 flex items-center justify-center">
            🚀 What's Next?
          </h3>
          <ul className="text-muted-foreground space-y-2 text-left">
            <li className="flex items-start">
              <span className="text-lg mr-2">👥</span>
              <span>Share the extension file with your friends</span>
            </li>
            <li className="flex items-start">
              <span className="text-lg mr-2">🎵</span>
              <span>Start a listening party together</span>
            </li>
            <li className="flex items-start">
              <span className="text-lg mr-2">💬</span>
              <span>Enjoy synchronized music experiences</span>
            </li>
          </ul>
        </div>

        {/* Queue System */}
        <div
          className={`grid grid-cols-2 gap-4 transition-all duration-500 ease-in-out overflow-hidden ${
            showQueues ? "opacity-100 max-h-[2000px]" : "opacity-0 max-h-0"
          }`}
        >
          {/* Left Queue - Active Users */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary mb-2">
              🎵 Active Users
            </h3>
            <div className="space-y-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className={`bg-card border border-border rounded-lg p-3 transition-all duration-500 ease-in-out ${
                    user.disabled ? "opacity-50" : "opacity-100"
                  }`}
                  style={{
                    animation: "fadeIn 0.5s ease-in-out",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{user.name}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                        >
                          <span className="text-lg">⋮</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-background border-border">
                        <DropdownMenuItem
                          onClick={() => toggleDisable(user.id)}
                          className="cursor-pointer"
                        >
                          {user.disabled ? "Enable Control" : "Disable Control"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => removeUser(user.id)}
                          className="cursor-pointer text-destructive"
                        >
                          Remove User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Queue - Join Requests */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-primary mb-2">
              📥 Join Requests
            </h3>
            <div className="space-y-2">
              {requests.map((request) => (
                <div
                  key={request.id}
                  className="bg-card border border-border rounded-lg p-3 transition-all duration-500 ease-in-out"
                  style={{
                    animation: "fadeIn 0.5s ease-in-out",
                  }}
                >
                  <div className="space-y-2">
                    <span className="text-sm text-foreground block">
                      {request.name}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="default"
                        className="flex-1 h-7 text-xs"
                        onClick={() => acceptRequest(request.id)}
                      >
                        ✅ Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1 h-7 text-xs"
                        onClick={() => rejectRequest(request.id)}
                      >
                        ❌ Reject
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={addRequest}
            >
              + Add Request
            </Button>
          </div>
        </div>

        <p
          className={`text-sm text-muted-foreground transition-all duration-500 ease-in-out overflow-hidden ${
            !showDiv ? "opacity-100 max-h-[500px] mt-6" : "opacity-0 max-h-0 mt-0"
          }`}
        >
          Thanks for using our installer! Have fun listening together! 💚
        </p>
      </div>
    </div>
  );
};
