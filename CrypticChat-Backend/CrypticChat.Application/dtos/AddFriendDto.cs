using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CrypticChat.Application.dtos
{
    public class AddFriendDto
    {
        public string UserOneId { get; set; }
        public string UserTwoId { get; set; }
    }
}