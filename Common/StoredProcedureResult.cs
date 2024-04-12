using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace Common
{

    [DataContract]
    public class StoredProcedureResult
    {
        [DataMember(Name = "code")]
        public int Code { get; set; }

        [DataMember(Name = "icon")]
        public string Icon { get; set; }

        [DataMember(Name = "msg")]
        public string Message { get; set; }

        [DataMember(Name = "header")]
        public string Header { get; set; }

        [DataMember(Name = "json_output")]
        public string JsonOutput { get; set; }

        [DataMember(Name = "current_page")]
        public int CurrentPage { get; set; }

        [DataMember(Name = "total_pages")]
        public int TotalPages { get; set; }
    }
}

