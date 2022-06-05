using Microsoft.EntityFrameworkCore;

namespace QuizAPI.Models
{
    public class QuizdbContext:DbContext
    {
        public QuizdbContext(DbContextOptions<QuizdbContext> options) : base(options)
        { }

        public DbSet<Question> Questions { get; set; }
        public DbSet<Participant> Participants { get; set; }
    }
}
