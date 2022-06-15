using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CrypticChat.Application.dtos
{
    public class RequestAnswer
    {
        public string? FriendId { get; set; }
        public bool Answer { get; set; }
    }
}